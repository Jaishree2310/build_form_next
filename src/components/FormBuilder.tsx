// FormBuilder.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { Check, CheckIcon, MoveUpRight, Plus } from "lucide-react";
import { useDragSensors } from "../utils/dnd-utils";
import { SortableFormField } from "./SortableFormField";
import { FormField } from "@/type/form-type";
import { Input } from "./ui/input";
import PeerlistUpRight from "./icons/PeerlistIcon-UpRight.svg";
import PeerListSave from "./icons/PeerlistIcon-Save.svg";

// Use a constant form ID instead of timestamp
const CURRENT_FORM_ID = 'current-form';
const FORM_STATE_KEY = `form-${CURRENT_FORM_ID}`;

export const FormBuilder: React.FC = () => {
  const router = useRouter();
  const [formTitle, setFormTitle] = useState("Untitled Form");
  const [fields, setFields] = useState<FormField[]>([]);
  const sensors = useDragSensors();

  // Load saved state on initial render
  useEffect(() => {
    const savedForm = localStorage.getItem(FORM_STATE_KEY);
    if (savedForm) {
      const { title, fields: savedFields } = JSON.parse(savedForm);
      setFormTitle(title || "Untitled Form");
      setFields(savedFields || []);
    }
  }, []);

  // Save state whenever form data changes
  const saveFormState = (newTitle: string, newFields: FormField[]) => {
    const formData = {
      id: CURRENT_FORM_ID,
      title: newTitle,
      fields: newFields,
    };
    localStorage.setItem(FORM_STATE_KEY, JSON.stringify(formData));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setFormTitle(newTitle);
    saveFormState(newTitle, fields);
  };

  const handlePreview = () => {
    saveFormState(formTitle, fields);
    router.push(`/preview?id=${CURRENT_FORM_ID}`);
  };

  const handleSaveDraft = () => {
    const formData = {
      id: CURRENT_FORM_ID,
      title: formTitle,
      fields,
      status: "draft",
    };
    localStorage.setItem(FORM_STATE_KEY, JSON.stringify(formData));
    alert("Draft saved successfully!");
  };

  const handlePublish = () => {
    const formData = {
      id: CURRENT_FORM_ID,
      title: formTitle,
      fields,
      status: "published",
    };
    localStorage.setItem(FORM_STATE_KEY, JSON.stringify(formData));
    alert("Form published successfully!");
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setFields((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);
        const newFields = arrayMove(items, oldIndex, newIndex);
        saveFormState(formTitle, newFields);
        return newFields;
      });
    }
  };

  const addField = () => {
    const newField: FormField = {
      id: `field-${fields.length + 1}`,
      type: "single",
      label: "Write a question",
      help: "This is a help text",
    };
    const newFields = [...fields, newField];
    setFields(newFields);
    saveFormState(formTitle, newFields);
  };

  const deleteField = (id: string) => {
    const newFields = fields.filter((field) => field.id !== id);
    setFields(newFields);
    saveFormState(formTitle, newFields);
  };

  const updateField = (updatedField: FormField) => {
    const newFields = fields.map((field) =>
      field.id === updatedField.id ? updatedField : field
    );
    setFields(newFields);
    saveFormState(formTitle, newFields);
  };

  return (
    <div className="max-w-4xl mx-auto flex justify-center min-h-screen">
      <div className="w-4/5 border flex flex-col justify-between">
        <div>
          <div className="flex justify-between p-6 border-b">
            <Input
              placeholder="Untitled Form"
              value={formTitle}
              onChange={handleTitleChange}
              className="text-base font-semibold border-none outline-none"
            />
            <Button
              variant="outline"
              className="rounded-2xl text-gray-400"
              onClick={handlePreview}
            >
              Preview <PeerlistUpRight />
            </Button>
          </div>

          <div className="m-6">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={fields.map((field) => field.id)}
                strategy={rectSortingStrategy}
              >
                {fields.map((field) => (
                  <SortableFormField
                    key={field.id}
                    field={field}
                    onDelete={deleteField}
                    onUpdate={updateField}
                  />
                ))}
              </SortableContext>
            </DndContext>

            <div className="flex justify-center w-full">
              <Button
                onClick={addField}
                className="mt-1 border rounded-2xl"
                variant={"ghost"}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Question
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-between p-6 border-t bg-gray-100">
          <Button
            variant="outline"
            className="rounded-2xl text-"
            onClick={handleSaveDraft}
          >
            <PeerListSave /> Save as Draft
          </Button>
          <Button className="rounded-2x bg-green-500" onClick={handlePublish}>
            <CheckIcon /> Publish Form
          </Button>
        </div>
      </div>
    </div>
  );
};