import clsx from 'clsx';
import { useSelectHoverBlock } from '../../_core/features/editor.hooks';
import { useDuplicateBlock, useRemoveBlock } from '../../_core/features/hooks';
import { Button } from '../../ui/Button';
import { BlockType } from '../../_core/blocks/blocks';
import { HTMLTextEditor } from './TextEditor';
import { PropsWithChildren, useRef } from 'react';
import { useSelectCurrentBlockFromState, useSelectDragBlockType } from '../../_react_builder/redux_hooks/selectors';

type HoverableProps = Readonly<
  PropsWithChildren<{
    data_id: string;
    db: boolean;
  }>
>;

export function Hoverable({ children, data_id, db }: HoverableProps) {
  const currentBlock = useSelectCurrentBlockFromState();
  const isSelected = !!data_id && currentBlock?.data_id === data_id;
  const removeBlock = useRemoveBlock();
  const duplicateBlock = useDuplicateBlock();
  const hoveredBlock = useSelectHoverBlock();

  const dragBlockType = useSelectDragBlockType();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className={'relative'}>
        <div
          className={clsx(
            'absolute top-0 left-0 w-full h-full',
            db ? 'z-[-1]' : 'z-10',
            isSelected ? 'border border-blue-700 hover:border-blue-700' : 'hover:border hover:border-green-500'
          )}
          data-exportable='false'
          ref={ref}
        />
        {children}
        {/* BLock Menu */}
        {isSelected && (
          <div
            className='absolute top-[-32px] left-0 bg-blue-600 flex gap-x-5 items-center z-40 p-1 rounded-t-sm'
            style={{
              maxWidth: ref.current?.clientWidth,
            }}
          >
            <span className='text-white text-xs'>{currentBlock.type}</span>
            <Button onClick={removeBlock} className='min-h-0 h-2 text-white border-none p-0'>
              <svg
                fill='#ffffff'
                height='16px'
                width='16px'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 325.284 325.284'
                stroke='#ffffff'
              >
                <g id='SVGRepo_bgCarrier' strokeWidth='0' />

                <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round' />

                <g id='SVGRepo_iconCarrier'>
                  {' '}
                  <g>
                    {' '}
                    <g>
                      {' '}
                      <g>
                        {' '}
                        <path d='M289.782,63.456H35.502c-7.04,0-12.768,5.732-12.768,12.768s5.732,12.768,12.768,12.768h2.828l25.856,206.644 c0,16.348,13.3,29.648,29.648,29.648h137.62c16.348,0,29.648-13.3,29.616-29.192l25.888-207.1h2.824 c7.04,0,12.768-5.732,12.768-12.768S296.822,63.456,289.782,63.456z M253.738,295.64c0,12.288-9.996,22.284-22.284,22.284H93.834 c-12.288,0-22.284-9.996-22.316-22.74L45.742,88.996h233.796L253.738,295.64z M289.782,81.632H35.502 c-2.98,0-5.404-2.424-5.404-5.404c0-2.98,2.424-5.404,5.404-5.404h254.28c2.98,0,5.404,2.424,5.404,5.404 C295.186,79.208,292.762,81.632,289.782,81.632z' />{' '}
                        <path d='M91.67,110.828c5.976,0,10.836,4.512,10.848,10.312l15.568,162.288c0,5.556-4.864,10.068-10.836,10.068 c-2.4,0-4.716-0.772-6.688-2.232c-1.148-0.86-2.76-0.616-3.6,0.536c-0.848,1.14-0.608,2.756,0.536,3.6 c2.864,2.128,6.236,3.244,9.752,3.244c8.82,0,15.992-6.824,15.98-15.46l-15.568-162.288c0-8.392-7.172-15.22-15.992-15.22 c-1.424,0-2.576,1.152-2.576,2.58C89.094,109.676,90.246,110.828,91.67,110.828z' />{' '}
                        <path d='M95.254,259.668c0.072,0,0.14-0.004,0.216-0.012c1.42-0.112,2.476-1.352,2.356-2.776l-7.976-98.652 c-0.112-1.42-1.4-2.448-2.776-2.356c-1.42,0.112-2.476,1.352-2.36,2.772l7.98,98.652 C92.798,258.648,93.926,259.668,95.254,259.668z' />{' '}
                        <path d='M176.058,177.516c-1.424,0-2.576,1.152-2.576,2.576v103.336c0,5.556-4.864,10.068-10.84,10.068 c-2.4,0-4.72-0.772-6.692-2.232c-1.14-0.856-2.76-0.612-3.6,0.54c-0.848,1.14-0.608,2.752,0.54,3.6 c2.864,2.124,6.24,3.24,9.752,3.24c8.82,0,15.992-6.824,15.992-15.22V180.088C178.634,178.664,177.482,177.516,176.058,177.516z' />{' '}
                        <path d='M154.418,254.94c1.424,0,2.576-1.152,2.576-2.576V112.368c1.724-1.008,3.656-1.54,5.652-1.54 c5.976,0,10.836,4.512,10.836,10.064v25.44c0,1.428,1.152,2.576,2.58,2.576c1.424,0,2.576-1.148,2.576-2.576v-25.44 c0-8.392-7.172-15.22-15.992-15.22c-3.516,0-6.892,1.12-9.76,3.248c-0.656,0.48-1.044,1.252-1.044,2.068v141.376 C151.842,253.788,152.994,254.94,154.418,254.94z' />{' '}
                        <path d='M219.05,132.444c1.432,0.156,2.636-1.012,2.708-2.436l0.948-17.592c1.744-1.044,3.704-1.588,5.72-1.588 c5.972,0,10.836,4.512,10.844,9.908l-10.392,162.692c0,5.552-4.864,10.064-10.836,10.064c-1.428,0-2.58,1.152-2.58,2.58 c0,1.424,1.152,2.576,2.58,2.576c8.82,0,15.988-6.828,15.984-15.06l10.392-162.692c0-8.392-7.172-15.22-15.992-15.22 c-3.516,0-6.892,1.12-9.76,3.248c-0.616,0.456-1,1.168-1.04,1.932l-1.016,18.88C216.538,131.156,217.63,132.368,219.05,132.444z' />{' '}
                        <path d='M210.754,275.728c0.052,0.004,0.1,0.004,0.152,0.004c1.356,0,2.488-1.056,2.572-2.424l6.436-109.056 c0.084-1.42-0.996-2.64-2.42-2.724c-1.36-0.092-2.636,1-2.72,2.42l-6.44,109.056 C208.246,274.428,209.334,275.648,210.754,275.728z' />{' '}
                        <path d='M43.614,56.54c2.032,0,3.684-1.648,3.684-3.684c0-12.288,9.996-22.288,22.284-22.288H255.71 c12.288,0,22.284,9.996,22.284,22.288c0,2.032,1.648,3.684,3.684,3.684c2.036,0,3.684-1.648,3.684-3.684 c0-16.348-13.3-29.648-29.648-29.648h-61.692C194.018,10.408,183.61,0,170.81,0h-16.336c-12.796,0-23.208,10.408-23.212,23.208 H69.578c-16.348,0-29.648,13.3-29.648,29.648C39.93,54.892,41.578,56.54,43.614,56.54z M154.474,7.364h16.336 c8.736,0,15.844,7.108,15.848,15.844h-48.032C138.63,14.472,145.738,7.364,154.474,7.364z' />{' '}
                        <path d='M258.734,41.384c-1.284-0.608-2.824-0.064-3.432,1.224c-0.608,1.284-0.06,2.82,1.224,3.432 c3.032,1.44,5.016,3.536,6.068,6.4c0.384,1.044,1.372,1.688,2.42,1.688c0.296,0,0.596-0.052,0.888-0.156 c1.34-0.492,2.024-1.972,1.532-3.308C265.91,46.528,262.982,43.404,258.734,41.384z' />{' '}
                        <path d='M220.206,38.056c-3.748,0.056-7.324,0.112-10.616,0.112c-1.424,0-2.576,1.152-2.576,2.58 c0,1.424,1.152,2.576,2.576,2.576c3.312,0,6.92-0.056,10.692-0.112c8.472-0.124,18.056-0.264,27.016,0.18 c0.044,0.004,0.092,0.004,0.132,0.004c1.364,0,2.504-1.072,2.572-2.444c0.08-1.42-1.02-2.632-2.44-2.704 C238.422,37.784,228.746,37.932,220.206,38.056z' />{' '}
                      </g>{' '}
                    </g>{' '}
                  </g>{' '}
                </g>
              </svg>
            </Button>
            <Button onClick={duplicateBlock} className='min-h-6 h-6 text-white border-none'>
              <svg
                fill='#ffffff'
                height='16px'
                width='16px'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 52 52'
                stroke='#ffffff'
              >
                <g stroke-width='0' />

                <g stroke-linecap='round' stroke-linejoin='round' />

                <g>
                  {' '}
                  <g>
                    {' '}
                    <path d='M45,0H11c-0.552,0-1,0.448-1,1v3H7C6.448,4,6,4.448,6,5v46c0,0.552,0.448,1,1,1h34c0.552,0,1-0.448,1-1v-3h3 c0.552,0,1-0.448,1-1V1C46,0.448,45.552,0,45,0z M40,50H8V6h23v8c0,0.552,0.448,1,1,1h8V50z M33,7.414L38.586,13H33V7.414z M44,46 h-2V14c0-0.022-0.011-0.041-0.013-0.063c-0.006-0.088-0.023-0.173-0.051-0.257c-0.011-0.032-0.019-0.063-0.034-0.094 c-0.049-0.106-0.11-0.207-0.196-0.293l-9-9c-0.086-0.086-0.187-0.147-0.293-0.196c-0.031-0.014-0.062-0.022-0.094-0.033 c-0.084-0.029-0.169-0.046-0.258-0.051C32.041,4.011,32.021,4,32,4H12V2h32V46z' />{' '}
                  </g>{' '}
                </g>
              </svg>
            </Button>
          </div>
        )}

        {/* Drop indicator utility  */}
        {hoveredBlock?.data_id !== null &&
          hoveredBlock?.data_id === data_id &&
          hoveredBlock?.type === dragBlockType && (
            <div className='absolute bottom-0 left-0 w-full border-2 border-green-400 text-center'>
              <p className='m-0 text-sm text-gray-500 absolute w-full text-center z-50'>
                Drop under{' '}
                {hoveredBlock?.type === BlockType.SECTION_CONTAINER
                  ? 'section'
                  : hoveredBlock?.children?.at(0)?.type ?? 'block'}
              </p>
            </div>
          )}
      </div>
      {isSelected && currentBlock.type === BlockType.TEXT && <HTMLTextEditor />}
    </>
  );
}
