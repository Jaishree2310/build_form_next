'use client'

import React, { useState } from 'react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { Button } from '@/components/ui/button';
import { Check, CheckIcon, MoveUpRight, Plus } from 'lucide-react';
import { useDragSensors } from '../utils/dnd-utils';
import { SortableFormField } from './SortableFormField';
import { FormField } from '@/type/form-type';
import { Input } from './ui/input';
import PeerlistUpRight  from './icons/PeerlistIcon-UpRight.svg';
import PeerListSave from './icons/PeerlistIcon-Save.svg'


export const FormBuilder: React.FC = () => {
  const [fields, setFields] = useState<FormField[]>([]);
  const sensors = useDragSensors();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (active.id !== over?.id) {
      setFields((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addField = () => {
    const newField: FormField = {
      id: `field-${Date.now()}`,
      type: 'single',
      label: 'Write a question',
      help: 'This is a help text',
    };
    setFields([...fields, newField]);
  };

  const deleteField = (id: string) => {
    setFields(fields.filter(field => field.id !== id));
  };

  const updateField = (updatedField: FormField) => {
    setFields(fields.map(field => 
      field.id === updatedField.id ? updatedField : field
    ));
  };

  return (
    <div className='max-w-4xl mx-auto flex justify-center min-h-screen'>
      <div className="w-4/5 border flex flex-col justify-between">
        <div>
          <div className='flex justify-between p-6 border-b'>
          <Input
            placeholder="Untitled Form"
            className="text-base border-none outline-none"
            />
            <Button variant="outline" className='rounded-2xl text-gray-400'>Preview <PeerlistUpRight/> </Button>
          </div>
          
          <div className='m-6'>
            <DndContext 
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext items={fields.map(field => field.id)} strategy={rectSortingStrategy}>
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
      
            <div className='flex justify-center w-full'>
              <Button onClick={addField} className="mt-1 border rounded-2xl" variant={'ghost'}>
                <Plus className="mr-2 h-4 w-4" /> Add Question
              </Button>
            </div>
          </div>
        </div>
        
        <div className='flex justify-between p-6 border-t bg-gray-100'>
        <Button variant="outline" className='rounded-2xl text-'><PeerListSave/> Save as Draft </Button>
          <Button className='rounded-2x bg-green-500'><CheckIcon/> Publish Form </Button>
        </div>
      </div>
    </div>
  );
};