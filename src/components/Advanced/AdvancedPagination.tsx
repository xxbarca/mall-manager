import { Button } from "@/components/ui/button";
import { PageMeta } from "@/types/base";

interface PaginationProps {
  setPage: (page: number) => void;
  meta: PageMeta;
}

export const AdvancedPagination = ({setPage, meta}: PaginationProps) => {
  return <div className="flex items-center justify-end space-x-2 py-4">
    <div className="space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setPage(meta.currentPage - 1)}
        disabled={meta.currentPage === 1}
        className={meta.currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'}
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setPage(meta.currentPage + 1)}
        disabled={meta.currentPage === meta.totalPages}
        className={meta.currentPage === meta.totalPages ? 'cursor-not-allowed' : 'cursor-pointer'}
      >
        Next
      </Button>
    </div>
  </div>
};
