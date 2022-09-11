interface TextObject {
  content: string;
  link: string;
}

interface AnnotationsObject {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}

interface TextProperties {
  type: "text";
  text: TextObject;
  annotations: AnnotationsObject;
  plain_text: string;
  href: string;
}

interface NameProps {
  title: TextProperties[];
}

interface Status {
  id: string;
}

export interface NotionPageProperties {
  Status: Status;
  Name: NameProps;
}

export interface NotionDatabase<T> {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  properties: T;
}
