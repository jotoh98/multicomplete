import { RequiredStar } from '@/app/RequiredStar'
import { optionsTable } from '@/app/docData'

export const OptionsOverview = () => (
  <section className="w-full px-4">
    <h2 className="mb-6 text-center text-2xl font-bold">Config Options</h2>
    <div className="block overflow-x-auto rounded-xl border-4 border-gray-200 px-12 py-6 font-mono">
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
            <th className="p-1 text-start">Description</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(optionsTable).map(([name, data]) => (
            <tr key={name}>
              <td className="p-1 pl-12 align-top">
                {name}
                {'optional' in data ? '?:' : ':'}
              </td>
              <td className="p-1 align-top">
                <code className="whitespace-nowrap">{data.type}</code>
              </td>
              <td className="p-1 align-top text-comment">
                // {data.description}
                {'optional' in data ? null : (
                  <>
                    &nbsp;
                    <RequiredStar />
                  </>
                )}
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
  </section>
)
