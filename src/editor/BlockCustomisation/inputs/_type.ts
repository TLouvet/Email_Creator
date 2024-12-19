import { BlockUpdateFunction } from '../../../_core/blocks/blocks';
import { WithTranslation } from '../../../_react_builder/i18n/withTranslation';

export type CustomizationInputProps = WithTranslation & {
  onChange: BlockUpdateFunction;
  block: any;
  mailGlobalStyle: any;
};
