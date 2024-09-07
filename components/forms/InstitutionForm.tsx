"use client";

import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "../ui/use-toast";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  address: z.string().optional(),
  institutionId: z.string().min(1, { message: "Institution ID is required" }),
  website: z
    .string()
    .url({ message: "Website must be a valid URL" })
    .optional(),
  imageUrl: z
    .string()
    .url({ message: "Image URL must be a valid URL" })
    .optional(),
  plan: z.enum(["Basic", "Standard", "Premium"], {
    required_error: "Plan is required",
  }),
  studentsCount: z.string()
    .min(0, { message: "Students count must be at least 0" })
});

interface InstitutionFormProps {
  defaultValues?: Partial<z.infer<typeof formSchema>>;
  onSubmit: (data: z.infer<typeof formSchema>) => Promise<void>;
  onClose: () => void;
  isAdd? : boolean;
}

const InstitutionForm: React.FC<InstitutionFormProps> = ({
  defaultValues,
  onSubmit,
  onClose,
  isAdd
}) => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      name: "",
      address: "",
      institutionId: "",
      website: "",
      imageUrl: "",
      plan: "Basic",
      studentsCount: 0,
    },
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  const handleSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (
    values
  ) => {
    try {
      await onSubmit(values);
      toast({
        title: "Institution updated successfully",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to update institution",
        description: "Please try again later",
      });
    }
  };

  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Institution Name"
                      {...field}
                      className="focus:ring-blue-500 focus:border-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Address"
                      {...field}
                      className="focus:ring-blue-500 focus:border-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="institutionId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institution ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Institution ID"
                      {...field}
                      className="focus:ring-blue-500 focus:border-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com"
                      {...field}
                      className="focus:ring-blue-500 focus:border-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/image.jpg"
                      {...field}
                      className="focus:ring-blue-500 focus:border-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="plan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plan</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Basic">Basic</option>
                      <option value="Standard">Standard</option>
                      <option value="Premium">Premium</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="studentsCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Students Count</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Number of Students"
                      {...field}
                      className="focus:ring-blue-500 focus:border-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <Button type="submit" className="w-full">
            {isAdd ? "Add" : "Update"}
          </Button>
          <Button type="button" onClick={onClose} className="w-full">
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default InstitutionForm;
