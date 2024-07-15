import ChatHeader from "@/components/chat/ChatHeader"
import { Channel, selectChannels } from "@/features/channel/ChannelsSlice"
import { selectServers, Server } from "@/features/server/ServerSlice"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

const ChannelIdPage = () => {
  const params = useParams()
  const servers: Server[] = useSelector(selectServers)
  const channels: Channel[] = useSelector(selectChannels)
  const channel: Channel | undefined = channels.find((channel) => channel._id === params.channelId)
  const server: Server | undefined = servers.find((server) => server._id === params.id)
  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-screen">
      {server && channel && (<ChatHeader serverId={server?._id} name={channel?.name} type="channel" imageUrl={server.serverImage.url}/>)}
    </div>
  )
}

export default ChannelIdPage
