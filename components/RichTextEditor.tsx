"use client";

import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface RichTextEditorProps {
  content: string;
  onChange: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content,
  onChange,
}) => {
  const handleEditorChange = (content: string) => {
    onChange(content);
  };

  return (
    <Editor
      apiKey="z7chwv0a8gals3v78ivvwi8d0s374x1213830j9q21kd4vwv"
      value={content}
      init={{
        height: 500,
        menubar: false,
        directionality: "ltr",
        plugins: [
          "lists",
        ],
        toolbar:
          "undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help",
      }}
      onEditorChange={handleEditorChange}
    />
  );
};

export default RichTextEditor;
