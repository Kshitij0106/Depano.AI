import { DesignType } from 'src/app/services/design.service';

export interface DesignResponse {
  status: string;
  url: string;
  message: string;
  designId: string;
  designType: DesignType;
}
