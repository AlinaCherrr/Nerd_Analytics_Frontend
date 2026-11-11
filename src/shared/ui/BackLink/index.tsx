import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import clsx from "clsx"
import styles from "./styles.module.scss"
import type { BackLinkProps } from "./types"

export const BackLink = ({ to, children, className }: BackLinkProps) => (
  <Link to={to} className={clsx(styles.link, className)}>
    <ArrowLeft size={14} />
    {children}
  </Link>
)

export type { BackLinkProps } from "./types"
