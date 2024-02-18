"use client";

import { format } from "date-fns";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { type Episode } from "../schema/episode";

interface EpisodeDetailDialogProps {
  episode: Episode;
}

export const EpisodeDetailDialog = NiceModal.create(
  ({ episode }: EpisodeDetailDialogProps) => {
    const { visible, show, hide } = useModal();
    return (
      <Dialog open={visible} onOpenChange={(open) => (open ? show() : hide())}>
        <DialogContent className="p-6 sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl underline decoration-primary underline-offset-8">
              {episode.name}
            </DialogTitle>
            <DialogDescription className="text-md flex flex-col">
              <span>
                <b>Air date</b>: {format(episode.air_date, "MM/dd/yyyy")}
              </span>
              <span>
                <b>Created</b>: {format(episode.created, "MM/dd/yyyy")}
              </span>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  },
);
