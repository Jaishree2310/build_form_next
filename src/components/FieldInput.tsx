import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { FormField } from '@/type/form-type';
import PeerlistDate from '../components/icons/PeerlistIcon-Date.svg'


interface FieldInputProps {
 field: FormField;
 onUpdate: (updatedField: FormField) => void;
}


export const FieldInput: React.FC<FieldInputProps> = ({ field, onUpdate }) => {
 console.log(field.type)
 switch (field.type) {
   case 'single':
     return (
       <div className="space-y-2">
         <Input type="text" placeholder="" disabled className='bg-gray-200 border-gray-300 h-8'/>
       </div>
     );
   case 'long':
     return (
       <div className="space-y-2">
         <Input type="textarea" placeholder="" className="min-h-[100px] bg-gray-200 border-gray-300" disabled />
       </div>
     );
     case 'radio':
       return (
         <div className="space-y-2">
           {field.options?.map((option, index) => (
             <div key={index} className="flex items-center space-x-2">
               {field.type === 'radio' && <input type="radio" disabled />}
               <Input
                 className='h-8 p-2'
                 value={option}
                 onChange={(e) => {
                   const newOptions = [...(field.options || [])];
                   newOptions[index] = e.target.value;
                   onUpdate({ ...field, options: newOptions });
                 }}
               />
               {
                 // add + button on last element
                 index === field.options?.length!! - 1 && (
                   <Button
                     className='border-none'
                     variant="ghost"
                     size="sm"
                     onClick={() => {
                       const currentOptions = field.options || [];
                       const newOptions = [...currentOptions, `Option ${currentOptions.length + 1}`];
                       onUpdate({ ...field, options: newOptions });
                     }}
                   >
                     <Plus className="mr-2 h-4 w-4" />
                   </Button>
                 )
               }
             </div>
           ))}
         </div>
       );
   case 'url':
     return (
       <div className="space-y-2">
         <Input type="url" placeholder="" className='h-8 bg-gray-200 border-gray-300' disabled />
       </div>
     );
   case 'date':
     // date with calendar picker
     return (
       <div className="flex items-center">
         <Input type="number" placeholder="MM-DD-YYYY" className='h-8 p-2 bg-gray-200 border-gray-300' disabled /><span className='px-2 flex items-center'><PeerlistDate/></span>
       </div>
     );
 }
};
