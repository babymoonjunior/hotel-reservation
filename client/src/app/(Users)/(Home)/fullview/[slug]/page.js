import ImageSlide from "@/app/(Users)/components/Fullview";
import Modal from "@/app/(Users)/components/Modal";

export default function FullViewImage({ params }) {
  return (
    <Modal>
      <div>
        <ImageSlide params={params} />
      </div>
    </Modal>
  );
}
