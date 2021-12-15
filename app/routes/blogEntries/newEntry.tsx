import { ActionFunction, json, redirect, useActionData } from "remix";
import { db } from "~/utils/db.server";
import { ActionData } from "~/utils/types";
import { requireUserId } from "~/utils/session.server";

function validateEntryTitle(title: string): string | undefined {
  if (title.length < 3) return "Title must be at least 3 characters long";
  return undefined;
}

function validateEntryContent(content: string): string | undefined {
  if (content.length < 10) return "Content must be at least 10 characters long";
  return undefined;
}

function validateEntrySubtitle(subtitle: string): string | undefined {
  if (subtitle.length < 3) return "Subtitle must be at least 3 characters long";
  return undefined;
}

const badRequest = (data: ActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const form = await request.formData();
  const title = form.get("title");
  const subtitle = form.get("subtitle");
  const content = form.get("content");

  if (
    typeof title !== "string" ||
    typeof content !== "string" ||
    typeof subtitle !== "string"
  ) {
    return badRequest({
      formError: `Form not submitted correctly.`,
    });
  }

  const fieldErrors = {
    title: validateEntryTitle(title),
    subtitle: validateEntrySubtitle(subtitle),
    content: validateEntryContent(content),
  };
  const fields = { title, content, subtitle };

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({ fieldErrors, fields });
  }

  const entry = await db.entry.create({
    data: { ...fields, bloggerId: userId },
  });
  return redirect(`/blogEntries/${entry.id}`);
};

export default function NewEntry() {
  const actionData = useActionData<ActionData>();

  return (
    <div>
      <p>Add your new blog entry</p>
      <form method="post">
        <div>
          <label>
            {" "}
            Title:{" "}
            <input
              placeholder="Your title here"
              defaultValue={actionData?.fields?.title}
              type="text"
              name="title"
              aria-invalid={
                Boolean(actionData?.fieldErrors?.title) || undefined
              }
              aria-describedby={
                actionData?.fieldErrors?.title ? "name-error" : undefined
              }
              id="title"
            />
          </label>
          {actionData?.fieldErrors?.title ? (
            <p className="form-validation-error" role="alert" id="name-error">
              {actionData.fieldErrors.title}
            </p>
          ) : null}
        </div>
        <div>
          <label>
            {" "}
            Subtitle:{" "}
            <input
              placeholder="Your subtitle here"
              defaultValue={actionData?.fields?.subtitle}
              type="text"
              name="subtitle"
              aria-invalid={
                Boolean(actionData?.fieldErrors?.subtitle) || undefined
              }
              aria-describedby={
                actionData?.fieldErrors?.subtitle ? "name-error" : undefined
              }
              id="subtitle"
            />
          </label>
          {actionData?.fieldErrors?.subtitle ? (
            <p className="form-validation-error" role="alert" id="name-error">
              {actionData.fieldErrors.subtitle}
            </p>
          ) : null}
        </div>
        <div>
          <label>
            {" "}
            Content:{" "}
            <textarea
              name="content"
              id="content"
              cols={80}
              rows={10}
            ></textarea>
          </label>
        </div>

        <div>
          <button type="submit" className="button">
            {" "}
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
