import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const LinkComponent = ({ caseID }) => {
    const url = `https://aaaj.legalserver.org/matter/switch/view/${caseID.substr(-6)}`;
    
    const handleClick = (event) => {
        event.preventDefault(); 
        console.log('handleClick is running')
        chrome.tabs.create({ url: url, active: false });
    };

    return (
        <a href={url} onClick={() => handleClick(event)}>
            <OpenInNewIcon
                key={caseID}
                sx={{ fontSize: 20, alignSelf: "center" }}
                titleAccess="View case"
              />
        </a>
    );
};

export default LinkComponent;