"use client";

import { useMemo } from "react";
import { CustomSelect, type Option } from "@/components/ui/custom-select";

export function AdminFilterSelect({
  id,
  label,
  value,
  options,
  changeAction,
  includeAll = true,
}: {
  id: string;
  label: string;
  value: string;
  options: ReadonlyArray<Option>;
  changeAction: (value: string) => void;
  includeAll?: boolean;
}) {
  const selectOptions = useMemo(() => {
    if (!includeAll) return options;
    return [{ label: "All", value: "all" }, ...options];
  }, [includeAll, options]);

  return (
    <div className="w-full lg:w-auto">
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-bold text-asoebi-purple-800"
      >
        {label}
      </label>
      <CustomSelect
        id={id}
        label={label}
        value={value}
        options={selectOptions}
        changeAction={changeAction}
        className="w-full lg:w-48"
      />
    </div>
  );
}
