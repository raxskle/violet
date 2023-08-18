import { useDispatch, useSelector } from "react-redux";
import { addElement } from "../../../redux/documentSlice";
import { RootState } from "../../../redux/store";

export const useTypeEnterAddText = () => {
  const dispatch = useDispatch();
  const selectedDocId = useSelector(
    (state: RootState) => state.appData.selectedDocId
  );

  return (e: React.ChangeEvent<HTMLTextAreaElement>, insertIndex: number) => {
    if (e.target.value.match(/\n/g)) {
      // 下方新增text
      dispatch(
        addElement({
          docId: selectedDocId,
          data: {
            type: "text",
            content: e.target.value.slice(e.target.selectionEnd),
            style: {},
          },
          index: insertIndex,
        })
      );
      e.target.value = e.target.value.slice(0, e.target.selectionEnd);
      e.target.blur();
    }

    // 限制当前输入回车\n
    e.target.value = e.target.value.replace(/\n/g, "");
  };
};
