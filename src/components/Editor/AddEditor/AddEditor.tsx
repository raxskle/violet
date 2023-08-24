import React, {
  type FC,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import style from "./AddEditor.module.scss";
import { ElementList } from "./ElementList/ElementList";
import { ReactComponent as AddIcon } from "../../../assets/svg/add-editor-add-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { addElement } from "../../../redux/documentSlice";
import { ElementToAdd } from "../../../redux/types";
import { RootState } from "../../../redux/store";

interface AddEditorProps {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  index: number;
}

const AddEditor: FC<AddEditorProps> = ({ active, setActive, index }) => {
  // 显示增加组件弹窗
  const [showAddPanel, setShowAddPanel] = useState(false);

  const dispatch = useDispatch();
  const selectedDocId = useSelector(
    (state: RootState) => state.appData.selectedDocId
  );

  const clickItemAddElement = (elementData: ElementToAdd) => {
    dispatch(
      addElement({
        docId: selectedDocId,
        data: elementData,
        index: index + 1,
      })
    );
    setActive(false);
    setShowAddPanel(false);
  };

  return (
    <div
      className={style["container"]}
      tabIndex={0}
      onBlur={() => {
        // 隐藏弹窗
        setActive(false);
        setShowAddPanel(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        setActive(true);
        setShowAddPanel(true);
      }}
    >
      <div className={style["icon"]}>
        <AddIcon />
      </div>
      {showAddPanel && (
        <ElementList clickItemAddElement={clickItemAddElement} />
      )}
    </div>
  );
};
export default AddEditor;
