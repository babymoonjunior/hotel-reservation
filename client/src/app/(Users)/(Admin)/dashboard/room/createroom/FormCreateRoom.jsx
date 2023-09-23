"use client";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function FormCreateRoom() {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="flex flex-col gap-10 pb-10 border-b border-gray-300">
      <h1 className="text-xl font-semibold leading-normal text-gray-600 -tracking-wider">
        Basic Information
      </h1>
      <div className="flex flex-col justify-center gap-1">
        <label htmlFor="roomtype" className="text-gray-900">
          Room Type*
        </label>
        <Controller
          control={control}
          name="roomtype"
          rules={{ required: true }}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              id="roomtype"
              className={`p-3 border border-gray-400 rounded-sm outline-none ${
                errors.roomtype ? `border-red-500` : `border-gray-400`
              }`}
            />
          )}
        />
        {errors.roomtype && (
          <p className="text-sm text-red-500">This is required.</p>
        )}
      </div>
      <div className="flex gap-10">
        <div className="flex flex-col flex-1 gap-1">
          <label htmlFor="roomsize" className="text-gray-900">
            Room size(sqm)*
          </label>
          <Controller
            control={control}
            name="roomsize"
            rules={{
              required: {
                value: true,
                message: `This is required.`,
              },
              pattern: {
                value: /[0-9]/,
                message: `Should be Number`,
              },
            }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                id="roomsize"
                className={`p-3 border border-gray-400 rounded-sm outline-none ${
                  errors.roomsize ? `border-red-500` : `border-gray-400`
                }`}
              />
            )}
          />
          {errors.roomsize && (
            <p className="text-sm text-red-500">{errors.roomsize?.message}</p>
          )}
        </div>
        <div className="flex flex-col flex-1 gap-1">
          <label htmlFor="bedtype" className="text-gray-900">
            Bed type*
          </label>
          <Controller
            control={control}
            name="bedtype"
            rules={{
              required: { value: true, message: `This is required.` },
            }}
            defaultValue=""
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger
                  className={`w-full p-6 border ${
                    errors.bedtype ? `border-red-500` : `border-gray-400`
                  }`}
                >
                  <SelectValue placeholder="Select a bed type" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectGroup>
                    <SelectLabel>Bed Type</SelectLabel>
                    <SelectItem value="Single Bed">Single Bed</SelectItem>
                    <SelectItem value="Double Bed">Double Bed</SelectItem>
                    <SelectItem value="King Size">King Size</SelectItem>
                    <SelectItem value="Twin Bed">Twin Bed</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.bedtype && (
            <p className="text-sm text-red-500">{errors.bedtype?.message}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col flex-1 gap-1">
        <label htmlFor="guests" className="text-gray-900">
          Guest(s)*
        </label>
        <Controller
          name="guests"
          control={control}
          rules={{
            required: { value: true, message: `This is required.` },
          }}
          defaultValue=""
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger
                className={`w-full max-w-[492px] p-6 border ${
                  errors.guests ? `border-red-500` : `border-gray-400`
                }`}
              >
                <SelectValue placeholder="Select a Guest(s)" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectGroup>
                  <SelectLabel>Guest(s)</SelectLabel>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="6">6</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        {errors.guests && (
          <p className="text-sm text-red-500">{errors.guests?.message}</p>
        )}
      </div>
      <div className="flex items-center gap-10">
        <div className="flex flex-col justify-center flex-1 gap-1">
          <label htmlFor="price" className="text-gray-900">
            Price per Night(THB)*
          </label>
          <Controller
            control={control}
            name="fullprice"
            rules={{
              required: {
                value: true,
                message: `This is required.`,
              },
              pattern: {
                value: /[0-9]/,
                message: `Should be Number`,
              },
            }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                id="price"
                className={`p-3 border rounded-sm outline-none ${
                  errors.fullprice ? `border-red-500` : `border-gray-400`
                }`}
              />
            )}
          />
          {errors.fullprice && (
            <p className="text-sm text-red-500">{errors.fullprice?.message}</p>
          )}
        </div>
        {/* Checkbox and Input for Promotion */}
        <div className="flex items-center flex-1 gap-4 pt-6">
          <Controller
            name="promotionChecked"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <Checkbox
                id="promotionChecked"
                className="w-6 h-6 border border-gray-400 rounded-sm data-[state=checked]:text-white data-[state=checked]:border-orange-300  data-[state=checked]:bg-orange-500"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <label htmlFor="promotion">Promotion</label>
          <Controller
            name="promotionprice"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                type="text"
                id="promotionprice"
                disabled={!watch("promotionChecked")}
                className="p-3 border border-gray-400 rounded-sm outline-none"
              />
            )}
          />
        </div>
      </div>
      <div className="flex flex-col justify-center gap-1">
        <label htmlFor="description" className="text-gray-900">
          Room Description*
        </label>
        <Controller
          control={control}
          name="description"
          rules={{
            required: { value: true, message: `This is required.` },
          }}
          render={({ field }) => (
            <textarea
              {...field}
              name="description"
              id="description"
              cols="30"
              rows="3"
              className={`w-full p-3 text-lg border rounded-sm outline-none resize-none ${
                errors.description ? `border-red-500` : `border-gray-400`
              }`}
            ></textarea>
          )}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description?.message}</p>
        )}
      </div>
    </div>
  );
}
