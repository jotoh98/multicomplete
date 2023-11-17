import { MoreInfo } from '@/components/MoreInfo'
import { ReturnInsights } from '@/data/types'
import { optionsTable } from '@/data/docData'

const returnInsights: ReturnInsights = {
  options: 'The filtered options to display',
  getWrapperProps:
    'A property bag for the element containing the values, the input and the popover button',
  getDeleteButtonProps: 'A property bag for the delete button of a value',
  getInputProps: 'A property bag for the input element',
  getPopoverButtonProps:
    'A property bag for the (arrow) button that opens the popover',
  getPopoverProps:
    'A property bag for the popover element holding all the options',
  getOptionProps: 'A property bag for an option element',
  activeOptionIndex: 'The index of the currently active option',
  activeValueIndex: 'The index of the currently active value',
}

export const CodeInsight = () => (
  <figure>
    <span className="absolute rounded-br-lg rounded-tl-xl bg-gray-200 px-2 py-1 text-sm">
      YourComponent.tsx
    </span>
    <code className="block w-full overflow-x-auto rounded-xl border-4 border-gray-200 px-12 pb-6 pt-10">
      <pre>
        <span className="text-keyword">import</span>
        {` { useMultiComplete } `}
        <span className="text-keyword">from</span>{' '}
        <span className="text-green-400">'multicomplete'</span>
        {`\n\n`}
        <span className="text-gray-300">{`// ...`}</span>
        {`\n\n`}
        <span className="text-keyword">const</span>
        {' { \n'}
        {Object.entries(returnInsights).map(([name, info]) => (
          <>
            {'    '}
            <MoreInfo
              className="text-return"
              info={info}
              key={name}
              href={`#return-${name}`}
            >
              {name}
            </MoreInfo>
            {',\n'}
          </>
        ))}
        {`} = `}
        <MoreInfo
          className="italic"
          info="The central hook"
          href={`#useMultiComplete`}
        >
          useMultiComplete
        </MoreInfo>
        {`<\n    `}
        <MoreInfo
          className="text-generics"
          info="A generic argument for the type of your options"
          href={`#generics-TValue`}
        >
          TValue
        </MoreInfo>
        {',\n    '}
        <MoreInfo
          info="Generic type for the input element used"
          className="text-generics"
          href={`#generics-TInputElement`}
        >
          TInputElement
        </MoreInfo>
        {' = HTMLInputElement,\n>({\n'}
        {Object.entries(optionsTable).map(([name, { description: info }]) => (
          <>
            {'    '}
            <MoreInfo
              className="text-option"
              info={info}
              key={name}
              href={`#options-${name}`}
            >
              {name}
            </MoreInfo>
            {',\n'}
          </>
        ))}
        {`})\n\n`}
        <span className="text-gray-300">{`// ...`}</span>
      </pre>
    </code>
    <figcaption className="sr-only">
      The <code>useMultiComplete</code> hook with all{' '}
      <span className="text-teal-500">options</span> and{' '}
      <span className="text-purple-400">result properties</span>
    </figcaption>
  </figure>
)
