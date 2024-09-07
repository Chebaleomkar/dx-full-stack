import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FineInfoCardProps{
    title : string;
    description? : string
}

const FineInfoCard = ({title , description}: FineInfoCardProps  ) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Fines Overview</CardTitle>
        <img
          className="h-4 w-4 text-muted-foreground"
          src="https://cdn-icons-png.flaticon.com/512/6333/6333316.png "
          alt="fine"
        />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{title}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default FineInfoCard;
