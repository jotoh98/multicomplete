import React from 'react'

type Infos = 'value' | 'input' | 'button' | 'option' | 'wrapper' | 'popover'

export const InteractiveAriaImage = ({
  activeInfo,
  setActiveInfo,
  active = true,
}: {
  activeInfo?: Infos | undefined
  setActiveInfo?: (info: Infos | undefined) => void
  active?: boolean
}) => {
  const getPathProps = (info: Infos) => ({
    ...activeOn(info),
    onMouseEnter() {
      setActiveInfo?.(info)
    },
    cursor: active ? 'pointer' : 'default',
  })

  const activeOn = (info: Infos, dash = false) => ({
    strokeWidth: activeInfo === info ? '3' : '1',
    strokeDasharray: dash
      ? activeInfo === info
        ? '3,5,0,0'
        : '3,5,0,0'
      : undefined,
    style: {
      transition: 'all 0.2s ease-in-out',
    },
    opacity: activeInfo && activeInfo !== info ? '0.5' : undefined,
  })

  const inactive = {
    style: {
      transition: 'all 0.2s ease-in-out',
    },
    opacity: activeInfo ? '0.5' : undefined,
  }
  const opacityOn = (info: Infos) => ({
    opacity: activeInfo && activeInfo !== info ? '0.5' : undefined,
  })
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="1.5"
      clipRule="evenodd"
      viewBox="0 0 600 450"
      color="hsl(var(--nextra-primary-hue)var(--nextra-primary-saturation)45%/1)"
      onPointerLeave={() => setActiveInfo?.(undefined)}
    >
      <style>{`
        .bg-color-scheme {
          fill: white;
        }
        .dark .bg-color-scheme {
          fill: rgb(17,17,17);
        }
      `}</style>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        d="M539.173 116.349a6 6 0 00-6-6h-484a6 6 0 00-6 6v51h496v-51z"
        {...inactive}
      />
      <clipPath id="_clip1">
        <path d="M539.173 323.349a6 6 0 01-6 6h-484a6 6 0 01-6-6v-156h496v156z" />
      </clipPath>
      <g clipPath="url(#_clip1)">
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          d="M43.173 167.349H539.173V203.349H43.173z"
          {...inactive}
        />
        <path
          fill="currentColor"
          d="M229.173 185.349c0-4.416-3.585-8-8-8h-157c-4.416 0-8 3.584-8 8 0 4.415 3.584 8 8 8h157c4.415 0 8-3.585 8-8z"
          {...inactive}
        />
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          d="M43.173 203.349H539.173V239.349H43.173z"
          {...inactive}
        />
        <path
          fill="currentColor"
          d="M204.173 221.349c0-4.416-3.585-8-8-8h-132c-4.416 0-8 3.584-8 8 0 4.415 3.584 8 8 8h132c4.415 0 8-3.585 8-8z"
          {...inactive}
        />
        <g fill="currentColor">
          <path
            fillOpacity="0.16"
            stroke="currentColor"
            strokeWidth="1"
            d="M43.173 239.349H539.173V275.349H43.173z"
            {...inactive}
          />
          <path
            d="M277.673 257.349c0-4.416-3.585-8-8-8h-205.5c-4.416 0-8 3.584-8 8 0 4.415 3.584 8 8 8h205.5c4.415 0 8-3.585 8-8z"
            {...inactive}
          />
        </g>
        <g>
          <path
            fill="currentColor"
            d="M229.173 293.349c0-4.416-3.585-8-8-8h-157c-4.416 0-8 3.584-8 8 0 4.415 3.584 8 8 8h157c4.415 0 8-3.585 8-8z"
            {...inactive}
          />
        </g>
        <g>
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            d="M43.173 311.349H539.173V347.349H43.173z"
            {...inactive}
          />
          <path
            fill="currentColor"
            d="M246.173 329.349c0-4.416-3.585-8-8-8h-174c-4.416 0-8 3.584-8 8 0 4.415 3.584 8 8 8h174c4.415 0 8-3.585 8-8z"
            {...inactive}
          />
        </g>
      </g>
      <path
        fill="none"
        stroke="currentColor"
        {...activeOn('wrapper', true)}
        d="M545.173 116.349c0-6.623-5.377-12-12-12h-484c-6.623 0-12 5.377-12 12v207c0 6.623 5.377 12 12 12h484c6.623 0 12-5.377 12-12v-207z"
      />
      <path
        fill="none"
        stroke="currentColor"
        {...activeOn('value')}
        d="M206.173 138.849c0-8.831-7.17-16-16-16h-111c-8.831 0-16 7.169-16 16 0 8.83 7.169 16 16 16h111c8.83 0 16-7.17 16-16z"
      />
      <path
        fill="none"
        stroke="currentColor"
        {...activeOn('popover')}
        d="M539.173 323.349a6 6 0 01-6 6h-484a6 6 0 01-6-6v-156h496v156z"
      />
      <path
        fill="currentColor"
        d="M171.173 138.849c0-4.416-3.585-8-8-8h-79c-4.416 0-8 3.584-8 8 0 4.415 3.584 8 8 8h79c4.415 0 8-3.585 8-8z"
        {...opacityOn('value')}
      />
      <path
        fill="currentColor"
        fillOpacity="0.23"
        d="M325.173 138.849c0-4.416-3.585-8-8-8h-79c-4.416 0-8 3.584-8 8 0 4.415 3.584 8 8 8h79c4.415 0 8-3.585 8-8z"
        {...opacityOn('input')}
      />
      <path
        fill="none"
        stroke="currentColor"
        {...activeOn('input', true)}
        d="M218.173 122.849H475.173V154.849H218.173z"
      />
      <circle
        cx="503.173"
        cy="138.849"
        r="16"
        fill="none"
        stroke="currentColor"
        {...activeOn('button', true)}
      ></circle>
      <circle
        cx="191.162"
        cy="138.849"
        r="10"
        fill="none"
        stroke="currentColor"
        {...activeOn('value', true)}
      ></circle>
      <g fill="none" stroke="currentColor" {...activeOn('value')}>
        <path d="M187.173 134.859l7.979 7.979M187.173 142.838l7.979-7.979" />
      </g>
      <g fill="none" stroke="currentColor" {...activeOn('button')}>
        <path d="M497.19 136.859l5.98 5.98M503.175 142.839l5.98-5.98" />
      </g>
      <a href="#value">
        <text
          x="72.736"
          y="77.32"
          fill="currentColor"
          fontFamily="'Arial-BoldMT', 'Arial', sans-serif"
          fontSize="12"
          fontWeight="700"
          {...getPathProps('value')}
        >
          Value &amp; Delete Button
        </text>
        <path
          fill="none"
          stroke="currentColor"
          d="M59.738 59.445H209.607V86.39H59.738z"
          {...getPathProps('value')}
        />
        white"
        <rect
          x={132}
          y={100}
          width={6}
          height={15}
          className="bg-color-scheme"
        />
        <path
          fill="none"
          stroke="currentColor"
          {...activeOn('value')}
          d="M134.673 122.849V86.39"
        />
      </a>
      <a href="#input">
        <text
          x="317.982"
          y="76.029"
          fill="currentColor"
          fontFamily="'Arial-BoldMT', 'Arial', sans-serif"
          fontSize="12"
          fontWeight="700"
          {...getPathProps('input')}
        >
          Input Field
        </text>
        <path
          fill="none"
          stroke="currentColor"
          d="M300.626 59.372H392.719V86.31700000000001H300.626z"
          {...getPathProps('input')}
        />
        <rect
          x={344}
          y={100}
          width={6}
          height={15}
          className="bg-color-scheme"
        />
        <path
          fill="none"
          stroke="currentColor"
          {...activeOn('input')}
          d="M346.673 138.849V86.317"
        />
      </a>
      <a href="#button">
        <text
          x="458.811"
          y="76.029"
          fill="currentColor"
          fontFamily="'Arial-BoldMT', 'Arial', sans-serif"
          fontSize="12"
          fontWeight="700"
          {...getPathProps('button')}
        >
          Popover button
        </text>
        <path
          fill="none"
          stroke="currentColor"
          d="M443.518 59.372H562.828V86.31700000000001H443.518z"
          {...getPathProps('button')}
        />
        <rect
          x={500}
          y={100}
          width={6}
          height={15}
          className="bg-color-scheme"
        />
        <path
          fill="none"
          stroke="currentColor"
          {...activeOn('button')}
          d="M503.173 129.639V86.317"
        />
      </a>
      <a href="#popover">
        <text
          x="130.042"
          y="380.191"
          fill="currentColor"
          fontFamily="'Arial-BoldMT', 'Arial', sans-serif"
          fontSize="12"
          fontWeight="700"
          {...getPathProps('popover')}
        >
          Popover
        </text>
        <path
          fill="none"
          stroke="currentColor"
          d="M105.504 363.68H203.61700000000002V390.625H105.504z"
          {...getPathProps('popover')}
        />
        <rect
          x={152}
          y={332}
          width={6}
          height={15}
          className="bg-color-scheme"
        />
        <path
          fill="none"
          stroke="currentColor"
          {...activeOn('popover')}
          d="M154.56 363.61v-34.261"
        />
      </a>
      <a href="#option">
        <text
          x="283.73"
          y="380.267"
          fill="currentColor"
          fontFamily="'Arial-BoldMT', 'Arial', sans-serif"
          fontSize="12"
          fontWeight="700"
          {...getPathProps('option')}
        >
          Option
        </text>
        <path
          fill="none"
          stroke="currentColor"
          d="M262.532 363.61H343.296V390.555H262.532z"
          {...getPathProps('option')}
        />
        <rect
          x={300}
          y={325}
          width={6}
          height={15}
          className="bg-color-scheme"
        />
        <path
          fill="none"
          stroke="currentColor"
          {...activeOn('option')}
          d="M302.914 363.61v-52.261"
        />
        <path
          fill="none"
          stroke="currentColor"
          {...activeOn('option')}
          d="M43.173 275.349H539.173V311.349H43.173z"
        />
      </a>
      <a href="#wrapper">
        <text
          x="419.087"
          y="380.267"
          fill="currentColor"
          fontFamily="'Arial-BoldMT', 'Arial', sans-serif"
          fontSize="12"
          fontWeight="700"
          {...getPathProps('wrapper')}
        >
          Wrapper
        </text>
        <path
          fill="none"
          stroke="currentColor"
          d="M403.031 363.683H483.795V390.628H403.031z"
          {...getPathProps('wrapper')}
        />
        <path
          fill="none"
          stroke="currentColor"
          {...activeOn('wrapper')}
          d="M443.413 363.61v-28.261"
        />
      </a>
    </svg>
  )
}
