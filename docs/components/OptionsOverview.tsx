import { optionsTable } from '@/data/docData'

export const OptionsOverview = () => (
  <div className="my-4 block overflow-x-auto rounded-xl border-4 border-gray-200 px-12 py-6 font-mono">
    <table className="table table-auto whitespace-nowrap">
      <thead>
        <tr>
          <th colSpan={99} className="p-2 text-start font-normal">
            <span className="text-keyword">export type</span>{' '}
            <span>
              UseMultiCompleteOptions&lt;
              <span className="text-generics">TValue</span>&gt; = {'{'}
            </span>
          </th>
        </tr>
        <tr className="text-start text-comment">
          <th className="p-1 pl-12 text-start">// Name</th>
          <th className="p-1 text-start">Type</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(optionsTable).map(([name, data]) => (
          <tr key={name}>
            <td className="p-1 pl-12 align-top">
              <a
                href={`#${name.toLowerCase()}`}
                className="underline decoration-dashed"
              >
                {name}
                {'optional' in data ? '?:' : ':'}
              </a>
            </td>
            <td className="p-1 align-top">
              <code className="whitespace-nowrap">{data.type}</code>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={99} className="p-2 text-start">
            {'}'}
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
)
