import testResults from '@/data/vitest-results.json'
import { FileTree } from 'nextra/components'

type AssertionResult =
  (typeof testResults)['testResults'][number]['assertionResults']

const unfoldAssertions = (assertions: AssertionResult) =>
  Array.from(
    assertions
      .reduce((acc, v) => {
        return acc.has(v.ancestorTitles.at(-1)!)
          ? acc.set(v.ancestorTitles.at(-1) ?? '', [
              ...acc.get(v.ancestorTitles.at(-1)!)!,
              v.title,
            ])
          : acc.set(v.ancestorTitles.at(-1)!, [v.title])
      }, new Map<string, string[]>())
      .entries() ?? []
  )

const map = testResults.testResults.map(
  (t) =>
    [t.name.split('/').at(-1)!, unfoldAssertions(t.assertionResults)] as const
)

export const TestResults = () => (
  <FileTree>
    {map.map(([filename, cases]) => (
      <FileTree.Folder name={filename} key={filename} defaultOpen>
        {cases.map(([ancestor, assertions]) => (
          <FileTree.Folder key={ancestor} name={ancestor} defaultOpen>
            {assertions.map((assertion) => (
              <FileTree.File
                key={assertion}
                name={assertion}
                label={<>{assertion} ✅</>}
              />
            ))}
          </FileTree.Folder>
        ))}
      </FileTree.Folder>
    ))}
  </FileTree>
)
