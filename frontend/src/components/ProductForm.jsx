function ProductForm({
  form,
  status,
  submitLabel,
  onChange,
  onSubmit,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-lg border border-stone-200 bg-white p-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-stone-700">
            Product Name
          </label>

          <input
            name="name"
            value={form.name}
            onChange={onChange}
            required
            className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700">
            Slug
          </label>

          <input
            name="slug"
            value={form.slug}
            onChange={onChange}
            required
            className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700">
            Type
          </label>

          <select
            name="type"
            value={form.type}
            onChange={onChange}
            required
            className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2"
          >
            <option value="raw">Raw</option>
            <option value="roasted">Roasted</option>
            <option value="salted">Salted</option>
            <option value="flavored">Flavored</option>
            <option value="organic">Organic</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700">
            Grade
          </label>

          <input
            name="grade"
            value={form.grade}
            onChange={onChange}
            required
            className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700">
            Weight Grams
          </label>

          <input
            type="number"
            name="weightGrams"
            value={form.weightGrams}
            onChange={onChange}
            required
            min="1"
            className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700">
            Price
          </label>

          <input
            type="number"
            name="price"
            value={form.price}
            onChange={onChange}
            required
            min="0"
            className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700">
            Stock
          </label>

          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={onChange}
            required
            min="0"
            className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-stone-700">
            Image URL
          </label>

          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={onChange}
            placeholder="https://example.com/image.jpg"
            className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-stone-700">
            Description
          </label>

          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            required
            rows="4"
            className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="mt-6 rounded-md bg-amber-700 px-4 py-2 font-semibold text-white hover:bg-amber-800 disabled:opacity-60"
      >
        {status === 'loading' ? 'Saving...' : submitLabel}
      </button>
    </form>
  );
}

export default ProductForm;