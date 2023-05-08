import { BiTrash } from 'react-icons/bi/index';
import { FaPen, FaUpload } from 'react-icons/fa/index';
import { GrClose } from 'react-icons/gr/index';
import { IoMdSettings, IoMdArrowBack } from 'react-icons/io/index';
import {
  MdOutlineDescription,
  MdLogout,
  MdDriveFileRenameOutline,
  MdUploadFile,
} from 'react-icons/md/index';
import { ReactComponent as AppIcon } from './appIcon.svg';
import { ReactComponent as CodepenLogo } from './codepenLogo.svg';
import { ReactComponent as CssIcon } from './cssIcon.svg';
import { ReactComponent as HomeCard1 } from './homeCard1.svg';
import { ReactComponent as HomeCard2 } from './homeCard2.svg';
import { ReactComponent as HomeCard3 } from './homeCard3.svg';
import { ReactComponent as HomeDecor1 } from './homeDecor1.svg';
import { ReactComponent as HomeDecor2 } from './homeDecor2.svg';
import { ReactComponent as HomeMain } from './homeMain.svg';
import { ReactComponent as HtmlIcon } from './htmlIcon.svg';
import initialUserImage from './initialUserImage.jpeg';
import { ReactComponent as JsIcon } from './jsIcon.svg';
import { ReactComponent as NewFileIcon } from './newFileIcon.svg';

export const appIcons = {
  TrashIcon: BiTrash,
  DescriptionIcon: MdOutlineDescription,
  PenIcon: FaPen,
  SettingIcon: IoMdSettings,
  LogoutIcon: MdLogout,
  RenameIcon: MdDriveFileRenameOutline,
  CloseIcon: GrClose,
  UploadFileIcon: MdUploadFile,
  UploadIcon: FaUpload,
  ArrowBackIcon: IoMdArrowBack,
  HtmlIcon,
  CssIcon,
  JsIcon,
  AppIcon,
  NewFileIcon,
};

export const appImages = {
  HomeDecor1,
  HomeDecor2,
  HomeCard1,
  HomeCard2,
  HomeCard3,
  HomeMain,
  CodepenLogo,
  initialUserImage,
};
