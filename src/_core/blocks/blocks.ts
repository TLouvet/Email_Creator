import { DEFAULT_PLACEHOLDER_URL } from '../constants';
import { chain } from '../utils/chain';

export interface IBlock {
  tag: keyof HTMLElementTagNameMap;
  type: BlockType;
}

export type BlockUpdateFunction = (value: { attribute: string; value: string }) => void;

export enum BlockType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  BUTTON = 'BUTTON',
  DIVIDER = 'DIVIDER',
  CONTAINER = 'CONTAINER',
  SPACER = 'SPACER',
  BASIC_SECTION = 'BASIC_SECTION',
  SECTION_CONTAINER = 'SECTION_CONTAINER',
  EMPTY = 'EMPTY',
}

export type DefaultBlock = {
  type: BlockType;
  tag: keyof HTMLElementTagNameMap;
  data: Record<string, string>;
};

export type MailBlock = DefaultBlock & {
  style: Record<string, string>;
  id: string;
  children?: MailBlock[];
};

export type Mail = {
  content: MailBlock[];
  defaultStyle: Record<string, string>;
};

export const BLOCK_CONTAINER = {
  label: 'Container',
  type: BlockType.CONTAINER,
  tag: 'div',
  children: [],
};

export const EMPTY_BLOCK = {
  type: BlockType.CONTAINER,
  tag: 'div',
  style: {
    padding: '20px',
  },
  children: [
    {
      type: BlockType.EMPTY,
      tag: 'div',
      data: {},
      style: {
        height: '70px',
        padding: '20px',
        margin: '0 auto',
        border: '1px dashed #000000',
        color: '#000000',
        backgroundColor: '#f0f0f0',
      },
    },
  ],
};

export const BLOCK_SECTION = {
  type: BlockType.BASIC_SECTION,
  tag: 'div',
  data: {},
  children: [{ ...EMPTY_BLOCK }],
};

// DEMO
export const BLOCK_SECTION_CONTAINER = {
  type: BlockType.SECTION_CONTAINER,
  tag: 'div',
  children: [],
};

export function injectSection(columns: number, layout: string) {
  return {
    ...BLOCK_SECTION_CONTAINER,
    style: {
      display: 'grid',
      gridTemplateColumns: layout,
      gridGap: '20px',
    },
    children: Array.from({ length: columns }, () => ({
      ...BLOCK_SECTION,
    })),
  };
}

export const BLOCK_SPACER = {
  label: 'Spacer',
  type: BlockType.CONTAINER,
  tag: 'div',
  children: [
    {
      type: BlockType.SPACER,
      tag: 'div',
      data: {},
    },
  ],
};

export const BLOCK_TEXT = {
  label: 'Text',
  type: BlockType.CONTAINER,
  tag: 'div',
  children: [
    {
      type: BlockType.TEXT,
      tag: 'p',
      data: {
        text: 'This is a text block',
      },
      properties: {
        contentEditable: 'true',
      },
    },
  ],
};

export const BLOCK_BUTTON = {
  label: 'Button',
  type: BlockType.BUTTON,
  tag: 'button',
  properties: {
    href: '',
  },
  data: {
    text: 'This is a button',
  },
};

export const BLOCK_BUTTON2 = {
  label: 'Button',
  type: BlockType.CONTAINER,
  tag: 'div',
  children: [
    {
      tag: 'button',
      type: BlockType.BUTTON,
      properties: {
        href: '',
      },
      data: {
        text: 'This is a button',
      },
    },
  ],
};

export const BLOCK_IMAGE = {
  label: 'Image',
  type: BlockType.CONTAINER,
  tag: 'div',
  children: [
    {
      type: BlockType.IMAGE,
      tag: 'img',
      properties: {
        src: DEFAULT_PLACEHOLDER_URL,
        alt: '',
      },
      data: {},
    },
  ],
};

export const BLOCK_DIVIDER = {
  label: 'Divider',
  type: BlockType.CONTAINER,
  tag: 'div',
  children: [
    {
      type: BlockType.DIVIDER,
      tag: 'div',
      data: {},
    },
  ],
};

export const BLOCK_HERO = {
  label: 'Hero',
  type: BlockType.CONTAINER,
  tag: 'div',
  children: [
    {
      ...BLOCK_TEXT,
      children: [
        {
          type: BlockType.TEXT,
          tag: 'h1',
          data: {
            text: 'This is a hero title',
          },
          style: {
            fontSize: '32px',
            fontWeight: '700',
            textAlign: 'center',
            color: '#000000',
          },
        },
      ],
    },
    {
      ...BLOCK_TEXT,
      children: [
        {
          type: BlockType.TEXT,
          tag: 'p',
          data: {
            text: 'This is a hero block',
          },
        },
      ],
    },
    {
      ...BLOCK_BUTTON2,
      children: [
        {
          tag: 'button',
          type: BlockType.BUTTON,
          properties: {
            href: '',
          },
          data: {
            text: 'This is a CTA',
          },
        },
      ],
    },
  ],
};

function copyBlock(block: MailBlock) {
  return {
    ...block,
  };
}

function injectIntoNewContainer(block: MailBlock) {
  return {
    ...BLOCK_CONTAINER,
    children: [block],
  };
}

const injectButton = () => chain(copyBlock, injectIntoNewContainer).withInitialArgs(BLOCK_BUTTON);
