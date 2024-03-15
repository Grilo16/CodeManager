import { useDispatch } from "react-redux";
import { handleInvoke } from "../../utils";
import { setCurrentPathData } from "../../features";

export const ExplorerControls = () => {
  const dispatch = useDispatch();

  const hanldeExplorerData = (functionName, path) => {
    handleInvoke(functionName, {path: path})
    .then((explorerData) => {
        if (explorerData) {
            dispatch(setCurrentPathData(explorerData))
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  }
    
  const moveUpDirectory = (currentDirectory) => {
    hanldeExplorerData("move_up_directory", currentDirectory)
  };

  const goToDirectory = (directoryPath) => {
    hanldeExplorerData("go_to_directory", directoryPath)
  };

  return { moveUpDirectory, goToDirectory };
};
