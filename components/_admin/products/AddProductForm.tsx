'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductSchema } from '@/types/products';
import RichTextEditor from '@/components/RichTextEditor';
import { z } from 'zod';

interface AddProductFormProps {
  onSubmit: (data: z.infer<typeof ProductSchema>) => void;
  isSubmitting: boolean;
}

export default function AddProductForm({
  onSubmit,
  isSubmitting,
}: AddProductFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
  });

  const handleFormSubmit = (data: z.infer<typeof ProductSchema>) => {
    onSubmit(data);
    if (!Object.keys(errors).length) reset(); // Reset form only if no errors
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            {...register('title')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="description">
            Description
          </label>
          <RichTextEditor
            content={watch('description') || ''}
            onChange={(value) => {
              setValue('description', value, { shouldValidate: true });
            }}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="price">
            Price
          </label>
          <input
            id="price"
            type="number"
            step="0.01"
            {...register('price', { valueAsNumber: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* Image URL */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="imageUrl">
            Image URL
          </label>
          <input
            id="imageUrl"
            type="text"
            {...register('imageUrl')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          {errors.imageUrl && (
            <p className="text-red-500 text-sm mt-1">{errors.imageUrl.message}</p>
          )}
        </div>

        {/* Stock */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="stock">
            Stock
          </label>
          <input
            id="stock"
            type="number"
            {...register('stock', { valueAsNumber: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          {errors.stock && (
            <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>
          )}
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            {...register('category')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Category</option>
            <option value="PAINTING">Painting</option>
            <option value="DIGITAL_ART">Digital Art</option>
            <option value="SCULPTURE">Sculpture</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
}
