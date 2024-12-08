"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PreviewFormField } from "@/components/PreviewFormField";

export default function PreviewPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [formData, setFormData] = useState<any>(null);
  const [responses, setResponses] = useState<Record<string, any>>({});
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

  const handleBack = () => {
    router.push('/');
  };

  const handleSubmit = () => {
    if (!formData) return;

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

  const updateResponse = (fieldId: string, value: any) => {
    const newResponses = { ...responses, [fieldId]: value };
    setResponses(newResponses);

    const totalFields = formData?.fields.length || 0;
    const filledFields = Object.values(newResponses).filter(
      (v) => v !== "" && v !== undefined && v !== null
    ).length;
    setCompleteness((filledFields / totalFields) * 100);
  };

  if (!formData) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 flex flex-col items-center ">
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
          {formData.fields.map((field: any) => (
            <PreviewFormField
              key={field.id}
              field={field}
              value={responses[field.id]}
              onChange={(value) => updateResponse(field.id, value)}
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