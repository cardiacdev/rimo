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
import { type Character } from "../schema/character";
import Image from "next/image";

interface CharacterDetailDialogProps {
  character: Character;
}

export const CharacterDetailDialog = NiceModal.create(
  ({ character }: CharacterDetailDialogProps) => {
    const { visible, show, hide } = useModal();
    return (
      <Dialog open={visible} onOpenChange={(open) => (open ? show() : hide())}>
        <DialogContent className="p-6 sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl underline decoration-primary underline-offset-8">
              {character.name}
            </DialogTitle>
            <DialogDescription className="text-md flex flex-col">
              <span>
                <b>Species</b>: {character.species}
              </span>
              <span>
                <b>Status</b>: {character.status}
              </span>
              <span>
                <b>Gender</b>: {character.gender}
              </span>
              {character.type && (
                <span>
                  <b>Type</b>: {character.type}
                </span>
              )}
              <span>
                <b>Created</b>: {format(character.created, "MM/dd/yyyy")}
              </span>
              <span>
                <b>Origin</b>: {character.origin.name}
              </span>
              <span>
                <b>Location</b>: {character.location.name}
              </span>

              <Image
                src={character.image}
                alt={character.name}
                width={300}
                height={300}
                className="mt-4"
              />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  },
);
