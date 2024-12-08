"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PreviewFormField } from "@/components/PreviewFormField";
import { z } from "zod";

// Validation schemas for different field types
const validationSchemas = {
  single: z.string().min(1, "This field is required"),
  long: z.string().min(1, "This field is required"),
  radio: z.string().min(1, "Please select an option"),
  url: z.string().url("Please enter a valid URL").min(1, "This field is required"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Please enter a valid date")
};

export default function PreviewPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [formData, setFormData] = useState(null);
  const [responses, setResponses] = useState({});
  const [errors, setErrors] = useState({});
  const [completeness, setCompleteness] = useState(0);

  useEffect(() => {
    const formId = searchParams.get("id");
    if (!formId) {
      router.push('/');
      return;
    }

    const savedForm = localStorage.getItem(`form-${formId}`);
    if (savedForm) {
      setFormData(JSON.parse(savedForm));
    } else {
      router.push('/');
    }
  }, [searchParams, router]);

  const validateField = (field, value) => {
    try {
      validationSchemas[field.type].parse(value);
      return null;
    } catch (error) {
      return error.errors[0].message;
    }
  };

  const updateResponse = (fieldId, value) => {
    const field = formData.fields.find(f => f.id === fieldId);
    const error = validateField(field, value);
    
    const newResponses = { ...responses, [fieldId]: value };
    const newErrors = { ...errors, [fieldId]: error };
    
    setResponses(newResponses);
    setErrors(newErrors);

    const totalFields = formData?.fields.length || 0;
    const filledFields = Object.values(newResponses).filter(
      (v) => v !== "" && v !== undefined && v !== null
    ).length;
    setCompleteness((filledFields / totalFields) * 100);
  };

  const handleBack = () => {
    router.push('/');
  };

  const handleSubmit = () => {
    if (!formData) return;

    // Validate all fields
    const newErrors = {};
    let hasErrors = false;

    formData.fields.forEach(field => {
      const value = responses[field.id] || "";
      const error = validateField(field, value);
      if (error) {
        newErrors[field.id] = error;
        hasErrors = true;
      }
    });

    setErrors(newErrors);

    if (hasErrors) {
      alert("Please fix the errors before submitting");
      return;
    }

    const submission = {
      formId: formData.id,
      responses,
      submittedAt: new Date().toISOString(),
    };

    localStorage.setItem(
      `submission-${formData.id}`,
      JSON.stringify(submission),
    );
    alert("Form submitted successfully!");
    router.push('/');
  };

  if (!formData) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 flex flex-col items-center">
      <div className="w-4/5 border p-6 min-h-screen">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-base font-bold">
              {formData.title || "Untitled Form"}
            </h1>
          </div>
          <div className="w-1/3 flex flex-col">
            <div className="text-right text-sm text-gray-500">
              Form completeness — {Math.round(completeness)}%
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div
                className="bg-green-500 h-2 rounded-full transition-all"
                style={{ width: `${completeness}%` }}
              />
            </div>
          </div>
        </div>
  
        <div className="space-y-6">
          {formData.fields.map((field) => (
            <PreviewFormField
              key={field.id}
              field={field}
              value={responses[field.id]}
              onChange={(value) => updateResponse(field.id, value)}
              error={errors[field.id]}
            />
          ))}
        </div>
  
        <div className="mt-6 flex justify-end">
          <Button
            onClick={handleSubmit}
            className="rounded-xl w-[80px] h-[32px] m-0 bg-green-600 hover:bg-green-500"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}