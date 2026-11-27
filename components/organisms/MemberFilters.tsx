import FilterSelect from "../molecules/FilterSelect";

interface MemberFiltersProps {
  memberFilter: string;
  onMemberFilterChange: (v: string) => void;
  planFilter: string;
  onPlanFilterChange: (v: string) => void;
  batchFilter: string;
  onBatchFilterChange: (v: string) => void;
}

export default function MemberFilters({
  memberFilter,
  onMemberFilterChange,
  planFilter,
  onPlanFilterChange,
  batchFilter,
  onBatchFilterChange,
}: MemberFiltersProps) {
  return (
    <div className="members-filters">
      <FilterSelect
        value={memberFilter}
        onChange={onMemberFilterChange}
        options={[
          { value: "ALL", label: "All Member" },
          { value: "PAID", label: "Paid" },
          { value: "DUE", label: "Due" },
        ]}
      />
      <FilterSelect
        value={planFilter}
        onChange={onPlanFilterChange}
        options={[
          { value: "ALL", label: "All Plans" },
          { value: "GENERAL", label: "General" },
          { value: "MONTHLY", label: "Monthly" },
          { value: "YEARLY", label: "Yearly" },
        ]}
      />
      <FilterSelect
        value={batchFilter}
        onChange={onBatchFilterChange}
        options={[
          { value: "ALL", label: "Select Batch" },
          { value: "6.00am", label: "6.00am to 7.00am" },
          { value: "6.00pm", label: "6.00pm to 7.00pm" },
        ]}
      />
    </div>
  );
}