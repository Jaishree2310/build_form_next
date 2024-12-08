import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FormField, FormFieldType } from "@/type/form-type";
import PeerListHandle from "../components/icons/PeerlistIcon-Handle.svg"
import PeerListSingle from "../components/icons/PeerlistIcon-Single.svg"
import PeerListMultiple from "../components/icons/PeerlistIcon-Multiple.svg"
import PeerListDate from "../components/icons/PeerlistIcon-Date.svg"
import PeerListRadio from "../components/icons/PeerlistIcon-Radio.svg"
import PeerListUrl from "../components/icons/PeerlistIcon-Link.svg"
import { FieldInput } from "./FieldInput";

interface InputTypesDropdownProps {
  value: FormFieldType;
  onChange: (value: FormFieldType) => void;
}

const InputTypesDropdown: React.FC<InputTypesDropdownProps> = ({ value, onChange }) => {
  const icons = {
    single: PeerListSingle,
    long: PeerListMultiple,
    date: PeerListDate,
    url: PeerListUrl,
    radio: PeerListRadio,
  };

  const renderIcon = (value: FormFieldType) => {
    const Icon = icons[value];
    return Icon ? <Icon className="h-5 w-5" /> : null;
  };

  return (
    <div className="w-full max-w-md">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-10 border-none shadow-none focus:ring-transparent px-0 justify-center bg-transparent">
          {value ? renderIcon(value) : null}
        </SelectTrigger>
        <SelectContent headerText={"INPUT TYPES"}>
          <SelectItem value="single">
            <div className="flex items-center gap-3">
              <PeerListSingle className="h-5 w-5" />
              <span>Single answer</span>
            </div>
          </SelectItem>
          <SelectItem value="long">
            <div className="flex items-center gap-3">
              <PeerListMultiple className="h-5 w-5" />
              <span>Long answer</span>
            </div>
          </SelectItem>
          <SelectItem value="radio">
            <div className="flex items-center gap-3">
              <PeerListRadio className="h-5 w-5" />
              <span>Single select</span>
            </div>
          </SelectItem>
          <SelectItem value="url">
            <div className="flex items-center gap-3">
              <PeerListUrl className="h-5 w-5" />
              <span>URL</span>
            </div>
          </SelectItem>
          <SelectItem value="date">
            <div className="flex items-center gap-3">
              <PeerListDate className="h-5 w-5" />
              <span>Date</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

interface SortableFormFieldProps {
  field: FormField;
  onDelete: (id: string) => void;
  onUpdate: (updatedField: FormField) => void;
}

export const SortableFormField: React.FC<SortableFormFieldProps> = ({
  field,
  onDelete,
  onUpdate,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: field.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const handleTypeChange = (newType: FormFieldType) => {
    const updatedField = {
      ...field,
      type: newType,
      // Initialize options array for radio type
      options: newType === 'radio' ? ['Option 1'] : undefined
    };
    onUpdate(updatedField);
  };

  return (
    <Card ref={setNodeRef} style={style} className="relative mb-6">
      <div className="p-4">
        <CardHeader className="flex-row items-center">
          <div className="w-full">
            <CardTitle className="flex-grow pb-1">
              <Input
                value={field.label}
                onChange={(e) => onUpdate({ ...field, label: e.target.value })}
                className="border-none outline-none text-gray-500"
              />
            </CardTitle>
            <Input
              value={field.help}
              onChange={(e) => onUpdate({ ...field, help: e.target.value })}
              className="border-none outline-none text-gray-400 text-sm"
            />
          </div>
          <div className="flex items-center">
            <InputTypesDropdown 
              value={field.type} 
              onChange={handleTypeChange}
            />
            <div {...attributes} {...listeners} className="cursor-move">
              <PeerListHandle className="h-5 w-5 text-gray-500"/>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-2">
          <FieldInput field={field} onUpdate={onUpdate} />
        </CardContent>
      </div>
    </Card>
  );
};