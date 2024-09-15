import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useInstitution from "@/hooks/useInstitution";

const UserTypeCount = () => {
  const { institutionData } = useInstitution();
  return (
    <>
      {institutionData &&
        <Card>
          <CardHeader>
            <CardTitle>Quick Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col">
                <dt className="text-sm font-medium text-muted-foreground">
                  Total Teacher
                </dt>
                <dd className="text-2xl font-semibold">{institutionData?.userCount}</dd>
              </div>
              <div className="flex flex-col">
                <dt className="text-sm font-medium text-muted-foreground">
                  Total Students
                </dt>
                <dd className="text-2xl font-semibold">{institutionData?.studentsCount}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      }
    </>
  );
};

export default UserTypeCount;
