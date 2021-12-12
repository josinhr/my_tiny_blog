export default function NewEntry() {
  return (
    <div>
        <p>Add your new blog entry</p>
        <form  method="post">
            <div>
                <label > Title: <input placeholder="Your title here" type="text" name="title" id="title"  /></label>
            </div>
            <div>
                <label > Subtitle: <input placeholder="Your subtitle here" type="text" name="subtitle" id="subtitle"  /></label>
            </div>
            <div>
                <label > Content: <textarea name="entryContent" id="entryContent" ></textarea></label>
            </div>

            <div>
                <button type="submit" className="button"> Add</button>
            </div>
        </form>
    </div>
  );

}