// import Blank from "./Blank";
import { useParams } from "react-router-dom";
import { useGetMessagesQuery } from "../../../features/messages/messagesApi";
import Error from '../../ui/Error';
import ChatHead from "./ChatHead";
import Messages from "./Messages";
import Options from "./Options";

export default function ChatBody() {
    const {id} = useParams();
    const {data:messages, isLoading, isError, error} = useGetMessagesQuery(id);

    //render step
    let content = null;

    if(isLoading){
        content = <div>Loading...</div>
    }else if(!isLoading && isError){
        content = <div> <Error message={error} /> </div>
    }else if(!isLoading && !isError && messages?.length === 0){
        content = <div>No message Found</div>
    }else if(!isLoading && !isError && messages?.length > 0){
        content = <>
                    <ChatHead
                    avatar="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
                    name="Akash Ahmed"
                />
                <Messages messages={messages} />
                <Options />
                </>
    }
    return (
        <div className="w-full lg:col-span-2 lg:block">
            <div className="w-full grid conversation-row-grid">
                {content}
            </div>
        </div>
    );
}
