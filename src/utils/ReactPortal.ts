import React from "react";
import { createPortal } from "react-dom";

type Props = {
  id: string;
}

const createWrapperAndAppendToBody = (wrapperId: string) => {
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}

export const ReactPortal: React.FC<Props> = ({ children, id }) => {
  const portal = document.getElementById(id)

  createWrapperAndAppendToBody(id)
  return portal ? createPortal(children, portal) : null
}