import { OptionsTable } from '@/data/types'

const tValue = <span className="text-generics">TValue</span>
export const optionsTable: OptionsTable = {
  values: {
    type: <>{tValue}[]</>,
    description: 'The values that are currently selected',
    section: null,
  },
  options: {
    type: <>{tValue}[]</>,
    description: 'All options to choose from',
    section: null,
  },
  onChange: {
    type: (
      <>
        (values: {tValue}[]) =&gt; <span className="text-keyword">void</span>
      </>
    ),
    description: 'A callback to update the values',
    section: null,
  },
  id: {
    type: <span className="text-keyword">string</span>,
    description: 'The id of the input element',
    section: null,
  },
  isEqual: {
    type: (
      <>
        (a: {tValue}, b: {tValue}) =&gt;{' '}
        <span className="text-keyword">boolean</span>
      </>
    ),
    description: 'A callback to check if two values are equal',
    section: null,
    optional: true,
    default: '(a, b) => a === b',
  },
  queryOptionFilter: {
    type: (
      <>
        (option: {tValue}, query: <span className="text-keyword">string</span>)
        =&gt; <span className="text-keyword">boolean</span>
      </>
    ),
    description: 'A callback to filter the options based on the query',
    section: null,
    optional: true,
    default:
      '(option, query) => option.toLowerCase().includes(query.toLowerCase())',
  },
  filterValues: {
    type: <span className="text-keyword">boolean</span>,
    description: 'A callback to filter the values based on the query',
    section: null,
    optional: true,
    default: 'true',
  },
  isOpen: {
    type: <span className="text-keyword">boolean</span>,
    description: 'Whether the popover is open',
    section: null,
    optional: true,
    default: 'false',
  },
  onOpenChange: {
    type: (
      <>
        (value: <span className="text-keyword">boolean</span>) =&gt;{' '}
        <span className="text-keyword">void</span>
      </>
    ),
    description: 'A callback to update the open state of the popover',
    section: null,
    optional: true,
    default: 'undefined',
  },
}
