"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import { pusherClient } from "@/lib/pusher/client";
import { ConversationSkeleton } from "@/app/loader/ChatListLoader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ConversationList() {
  const [conversations, setConversations] = useState<any[]>([]);
  const [onlineMap, setOnlineMap] = useState<Record<string, boolean>>({});
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);

  const activeConversationId = pathname?.split("/")[2];

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const [convRes, unreadRes] = await Promise.all([
          axios.get("/api/conversation/list"),
          axios.get("/api/chatseen"),
        ]);

        const conversationsWithUnread = convRes.data.map((conv: any) => ({
          ...conv,
          unreadCount: unreadRes.data[conv.id] || 0,
        }));

        setConversations(conversationsWithUnread);
      } catch (error) {
        console.error("Failed to fetch conversations", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);
  useEffect(() => {
    if (!session?.user?.id) return;

    const channel = pusherClient.subscribe(`user-${session.user.id}`);

    channel.bind("message:new", (newMessage: any) => {
      setConversations((current) => {
        return current.map((conv) => {
          if (conv.id === newMessage.conversationId) {
            return {
              ...conv,
              messages: [newMessage],
              _count: {
                messages: (conv._count?.messages || 0) + 1,
              },
            };
          }
          return conv;
        });
      });
    });

    return () => pusherClient.unsubscribe(`user-${session.user.id}`);
  }, [session?.user?.id]);

  useEffect(() => {
    const channel = pusherClient.subscribe("presence-global");

    // When subscription is ready
    channel.bind("pusher:subscription_succeeded", (members: any) => {
      console.log("Successfully subscribed! Members found:", members.count);
      const onlineUsers: Record<string, boolean> = {};

      members.each((member: any) => {
        onlineUsers[member.id] = true;
      });

      setOnlineMap(onlineUsers);
    });
    channel.bind("pusher:subscription_error", (error: any) => {
      console.error("Pusher Auth Error:", error);
    });

    // When someone comes online
    channel.bind("pusher:member_added", (member: any) => {
      setOnlineMap((prev) => ({
        ...prev,
        [member.id]: true,
      }));
    });

    // When someone goes offline
    channel.bind("pusher:member_removed", (member: any) => {
      setOnlineMap((prev) => ({
        ...prev,
        [member.id]: false,
      }));
    });

    return () => {
      pusherClient.unsubscribe("presence-global");
    };
  }, []);

  return (
    <div className="lg:w-80 md:w-full w-full border-r bg-white dark:bg-black">
      <h1 className="text-xl px-3 py-5">Chats</h1>

      {loading
        ? Array.from({ length: 8 }).map((_, i) => (
            <ConversationSkeleton key={i} />
          ))
        : conversations.map((conv) => {
            const isOwner = conv.store.ownerId === session?.user?.id;
            const unRead = conv.messages;
            console.log(unRead);

            const other = isOwner
              ? {
                  id: conv.buyerId,
                  name: conv.buyer?.name || "Buyer",
                  image: conv.buyer?.image || "/avatar.avif",
                }
              : {
                  id: conv.store.ownerId,
                  name: conv.store?.title || "Store",
                  image: conv.store.bannerImageUrl,
                };

            const isActive = conv.id === activeConversationId;
            const isOnline = onlineMap[other.id];
            const unreadCount = conv._count?.messages || 0;
            const hasUnread = unreadCount > 0;

            return (
              <div
                key={conv.id}
                onClick={() => router.push(`/chat/${conv.id}`)}
                className={clsx(
                  "flex cursor-pointer items-center gap-3 px-4 py-3 transition",
                  isActive
                    ? "bg-gray-100 dark:bg-gray-900"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800",
                )}
              >
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={other.image} />
                    <AvatarFallback>{other.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-black" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <p className="font-semibold text-black dark:text-white truncate">
                      {other.name}
                    </p>
                    {/* Timestamp */}
                    <span className="text-xs text-gray-500">
                      {conv.messages[0]
                        ? new Date(
                            conv.messages[0].createdAt,
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : ""}
                    </span>
                  </div>

                  <div className="flex justify-between items-center gap-2">
                    <p
                      className={clsx(
                        "text-sm truncate",
                        hasUnread
                          ? "text-black dark:text-white font-bold"
                          : "text-gray-500",
                      )}
                    >
                      {conv.messages[0]?.text || "No messages yet"}
                    </p>

                    {/* THE NOTIFICATION DOT/NUMBER */}
                    {conv.unreadCount > 0 && (
                      <div className="bg-blue-600 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
                        {conv.unreadCount}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
    </div>
  );
}
