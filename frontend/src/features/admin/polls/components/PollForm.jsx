import { useFieldArray, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../../../../components/ui/Input";
import Button from "../../../../components/ui/Button";

import { pollFormSchema } from "../schemas/pollForm.schema";

export default function PollForm({
  defaultValues,
  onSubmit,
  submitting = false,
}) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(pollFormSchema),

    defaultValues: defaultValues ?? {
      title: "",
      description: "",
      startsAt: "",
      endsAt: "",
      options: [
        {
          title: "",
          description: "",
        },
        {
          title: "",
          description: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <section className="space-y-5">
        <Input
          label="Poll title"
          placeholder="Choose the next CS Club course"
          {...register("title")}
          error={errors.title?.message}
        />

        <div className="space-y-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-text-primary"
          >
            Description
          </label>

          <textarea
            id="description"
            rows={4}
            {...register("description")}
            className="w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />

          {errors.description && (
            <p className="text-sm text-danger">{errors.description.message}</p>
          )}
        </div>
      </section>

      <section className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="startsAt"
            className="block text-sm font-medium text-text-primary"
          >
            Starts at
          </label>

          <input
            id="startsAt"
            type="datetime-local"
            {...register("startsAt")}
            className="mt-2 w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm"
          />

          {errors.startsAt && (
            <p className="mt-2 text-sm text-danger">
              {errors.startsAt.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="endsAt"
            className="block text-sm font-medium text-text-primary"
          >
            Ends at
          </label>

          <input
            id="endsAt"
            type="datetime-local"
            {...register("endsAt")}
            className="mt-2 w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm"
          />

          {errors.endsAt && (
            <p className="mt-2 text-sm text-danger">{errors.endsAt.message}</p>
          )}
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">Course options</h2>

            <p className="mt-1 text-sm text-text-secondary">
              Add between 2 and 4 choices.
            </p>
          </div>

          {
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() =>
                append({
                  title: "",
                  description: "",
                })
              }
            >
              Add option
            </Button>
          }
        </div>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="rounded-lg border border-border p-5">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-medium">Option {index + 1}</h3>

                {fields.length > 2 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>

              <div className="mt-4 space-y-4">
                <Input
                  label="Option title"
                  placeholder="Artificial Intelligence"
                  {...register(`options.${index}.title`)}
                  error={errors.options?.[index]?.title?.message}
                />

                <Input
                  label="Option description"
                  placeholder="Introduction to..."
                  {...register(`options.${index}.description`)}
                  error={errors.options?.[index]?.description?.message}
                />
              </div>
            </div>
          ))}
        </div>

        {errors.options?.message && (
          <p className="text-sm text-danger">{errors.options.message}</p>
        )}
      </section>

      <div className="flex justify-end gap-3 border-t border-border pt-6">
        <Button type="submit" loading={submitting}>
          Save draft
        </Button>
      </div>
    </form>
  );
}
