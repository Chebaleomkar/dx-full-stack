import { StudentFineTableSkeleton } from "@/components/skeleton/StudentFineTableSkeleton"
import { NoFineFound } from "@/components/Student/NoFineFound"
import { StudentFineCard } from "@/components/cards/StudentFineCard"
import useStudentFines from "@/hooks/useStudentFines"
import { Fine } from "@/types/Fine"

const StudentFinesTable=()=> {
  const { fines, loading, error } = useStudentFines();
  if (loading) {
    <StudentFineTableSkeleton />
  }

  if (error) {
    return <div className="text-red-500 mt-4">{error}</div>
  }

  if (!fines.length) {
    return (
      <NoFineFound />
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Your Fines</h2>
      {fines.map((fine: Fine, i) => (
        <StudentFineCard key={i} fine={fine} />
      ))}
    </div>
  )
}
export default StudentFinesTable;