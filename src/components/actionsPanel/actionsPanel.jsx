import Header from "./header";
import Zone from "./zones";

import './actionsPanel.scss';

const ActionsPanel = () => {
    return (
        <>
            <Header />
            <div className="actions-panel">
                <div className="actions-panel__inner">
                    <Zone />
                </div>
            </div>
        </>
    )
}

export default ActionsPanel;
