import Modal from "@/app/(Users)/components/Modal";
import Fullviewimage from "../../../components/Fullview";

export default function FullViewImage({ params }) {
  return (
    <Modal>
      <div>
        <Fullviewimage params={params} />
      </div>
    </Modal>
  );
}
