"use client";

import React from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import { Button } from "@/components/ui/button";

interface TiptapProps {
  content: string;
  onChange: (value: string) => void;
}

const MenuBar: React.FC<{ editor: Editor | null }> = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="flex space-x-2 mb-4">
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "bg-gray-200" : ""}
      >
        Bold
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "bg-gray-200" : ""}
      >
        Italic
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().toggleMark('underline').run()}
        className={editor.isActive("underline") ? "bg-gray-200" : ""}
      >
        Underline
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "bg-gray-200" : ""}
      >
        H1
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "bg-gray-200" : ""}
      >
        H2
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? "bg-gray-200" : ""}
      >
        Paragraph
      </Button>
    </div>
  );
};

const Tiptap: React.FC<TiptapProps> = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit, Bold, Italic, Underline, Heading],
    content: content || "<p>Start typing here...</p>",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  });

  React.useEffect(() => {
    if (editor) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  return (
    <div>
      <MenuBar editor={editor} />
      <div className="border border-gray-300 rounded-md p-2">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Tiptap;
