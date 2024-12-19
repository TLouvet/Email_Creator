import { BlockType } from '../../blocks/blocks';

export interface WithMaybeChildren {
  children?: unknown[];
}

export interface WithChildren {
  children: AnyBlockWithChildren[];
}

export interface WithDataId {
  data_id: string;
}

export interface WithType {
  type: BlockType;
  children: WithDataId[];
}

export type RecordKey = string | number | symbol;
export type AnyRecord = Record<RecordKey, unknown>;

export type AnyBlockWithChildren = WithChildren & AnyRecord;
