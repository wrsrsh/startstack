"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  organization,
  useListOrganizations,
  useSession,
} from "@/lib/auth/client";
import { ChevronDown, Loader2, MailPlus, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import CopyButton from "@/components/ui/copy-button";
import Image from "next/image";
import {
  Invitation,
  Member,
  Organization,
  ActiveOrganization,
  Session,
} from "@/types/auth";

type OnInvitationSuccessData = {
  data: Invitation;
};

export function WorkspacePage(props: {
  session: Session | null;
  activeOrganization: ActiveOrganization | null;
}) {
  const organizations = useListOrganizations();
  const [optimisticOrg, setOptimisticOrg] = useState<ActiveOrganization | null>(
    props.activeOrganization,
  );
  const [isRevoking, setIsRevoking] = useState<string[]>([]);
  const inviteVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" },
    exit: { opacity: 0, height: 0 },
  };

  const { data } = useSession();
  const session = data || props.session;

  const currentMember = optimisticOrg?.members.find(
    (member: Member) => member.userId === session?.user.id,
  );

  return (
    <Card className="w-full bg-background shadow-lg">
      <CardHeader className="pb-6">
        <CardTitle className="mb-4 text-base">
          Workspace Options
        </CardTitle>
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 rounded-lg">
            <AvatarImage
              className="h-full w-full rounded-lg object-cover"
              src={optimisticOrg?.logo || ""}
            />
            <AvatarFallback className="rounded-lg text-lg">
              {optimisticOrg?.name?.slice(0,2).toUpperCase() || "P"}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-base font-semibold">
              {optimisticOrg?.name || "Personal"}
            </p>
            <p className="text-sm text-muted-foreground">
              {optimisticOrg?.members.length || 1}{" "}
              {optimisticOrg?.members.length === 1 ? "member" : "members"}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-base font-semibold">Members</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {optimisticOrg?.members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between rounded-xl border border-input px-4 py-2"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 bg-muted-foreground">
                    <AvatarImage
                      src={member.user.image || ""}
                      className="object-cover"
                    />
                    <AvatarFallback className="text-base font-medium bg-muted-foreground text-white">
                      {member.user.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{member.user.name}</p>
                    <p className="text-sm capitalize text-muted-foreground">
                      {member.role}
                    </p>
                  </div>
                </div>
                {member.role !== "owner" &&
                  (currentMember?.role === "owner" ||
                    currentMember?.role === "admin") && (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        organization.removeMember({
                          memberIdOrEmail: member.id,
                        });
                      }}
                    >
                      {currentMember?.id === member.id ? "Leave" : "Remove"}
                    </Button>
                  )}
              </div>
            ))}
            {!optimisticOrg?.id && (
              <div className="flex items-center gap-3 rounded-lg bg-muted p-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={session?.user.image || ""} />
                  <AvatarFallback className="text-lg font-medium">
                    {session?.user.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{session?.user.name}</p>
                  <p className="text-sm text-muted-foreground">Owner</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-base font-semibold">Invites</h3>
          <div className="space-y-3">
            <AnimatePresence>
              {optimisticOrg?.invitations
                .filter(
                  (invitation: Invitation) => invitation.status === "pending",
                )
                .map((invitation: Invitation) => (
                  <motion.div
                    key={invitation.id}
                    className="flex items-center justify-between rounded-lg bg-muted px-4 py-3"
                    variants={inviteVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                  >
                    <div>
                      <p className="font-medium">{invitation.email}</p>
                      <p className="text-sm capitalize text-muted-foreground">
                        {invitation.role}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        disabled={isRevoking.includes(invitation.id)}
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          organization.cancelInvitation(
                            {
                              invitationId: invitation.id,
                            },
                            {
                              onRequest: () => {
                                setIsRevoking([...isRevoking, invitation.id]);
                              },
                              onSuccess: () => {
                                toast.success(
                                  "Invitation revoked successfully",
                                );
                                setIsRevoking(
                                  isRevoking.filter(
                                    (id) => id !== invitation.id,
                                  ),
                                );
                                setOptimisticOrg({
                                  ...optimisticOrg,
                                  invitations:
                                    optimisticOrg?.invitations.filter(
                                      (inv) => inv.id !== invitation.id,
                                    ),
                                });
                              },
                              onError: (ctx) => {
                                toast.error(ctx.error.message);
                                setIsRevoking(
                                  isRevoking.filter(
                                    (id) => id !== invitation.id,
                                  ),
                                );
                              },
                            },
                          );
                        }}
                      >
                        {isRevoking.includes(invitation.id) ? (
                          <Loader2 className="animate-spin" size={16} />
                        ) : (
                          "Revoke"
                        )}
                      </Button>
                      <div>
                        <CopyButton
                          textToCopy={`${window.location.origin}/accept-invitation/${invitation.id}`}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
            {optimisticOrg?.invitations.length === 0 && (
              <motion.p
                className="text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                No Active Invitations
              </motion.p>
            )}
            {!optimisticOrg?.id && (
              <Label className="text-sm text-muted-foreground">
                You can&apos;t invite members to your personal workspace.
              </Label>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <div>
            <div>
              {optimisticOrg?.id && (
                <InviteMemberDialog
                  setOptimisticOrg={setOptimisticOrg}
                  optimisticOrg={optimisticOrg}
                />
              )}
            </div>
          </div>
          <CreateOrganizationDialog />
        </div>
      </CardContent>
    </Card>
  );
}

function CreateOrganizationDialog() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isSlugEdited, setIsSlugEdited] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);

  useEffect(() => {
    if (!isSlugEdited) {
      const generatedSlug = name.trim().toLowerCase().replace(/\s+/g, "-");
      setSlug(generatedSlug);
    }
  }, [name, isSlugEdited]);

  useEffect(() => {
    if (open) {
      setName("");
      setSlug("");
      setIsSlugEdited(false);
      setLogo(null);
    }
  }, [open]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2" variant="outline">
          <Plus className="h-4 w-4" />
          <p>New Organization</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            New Organization
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Create a new organization to collaborate with your team.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="org-name">Organization Name</Label>
            <Input
              id="org-name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="org-slug">Organization Slug</Label>
            <Input
              id="org-slug"
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
                setIsSlugEdited(true);
              }}
              placeholder="Slug"
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="org-logo">Logo</Label>
            <Input
              id="org-logo"
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="w-full"
            />
            {logo && (
              <div className="mt-2">
                <Image
                  src={logo}
                  alt="Logo preview"
                  className="h-16 w-16 rounded-lg object-cover"
                  width={64}
                  height={64}
                />
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={loading}
            onClick={async () => {
              setLoading(true);
              await organization.create(
                {
                  name: name,
                  slug: slug,
                  logo: logo || undefined,
                },
                {
                  onResponse: () => {
                    setLoading(false);
                  },
                  onSuccess: () => {
                    toast.success("Organization created successfully");
                    setOpen(false);
                  },
                  onError: (error) => {
                    toast.error(error.error.message);
                    setLoading(false);
                  },
                },
              );
            }}
            className="w-full"
          >
            {loading ? (
              <Loader2 size={16} className="mr-2 animate-spin" />
            ) : (
              "Create"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function InviteMemberDialog({
  setOptimisticOrg,
  optimisticOrg,
}: {
  setOptimisticOrg: (org: ActiveOrganization | null) => void;
  optimisticOrg: ActiveOrganization | null;
}) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("member");
  const [loading, setLoading] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="gap-2"
          variant="default"
          onClick={() => setOpen(true)}
        >
          <MailPlus size={16} />
          <p>Invite Member</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Invite Member
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Invite a member to your organization.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger id="role" className="w-full">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="member">Member</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={loading}
            onClick={async () => {
              setOpen(false);
              const invite = organization.inviteMember({
                email: email,
                role: role as "member",
                fetchOptions: {
                  throw: true,
                  onSuccess: (ctx: OnInvitationSuccessData) => {
                    if (optimisticOrg) {
                      setOptimisticOrg({
                        ...optimisticOrg,
                        invitations: [
                          ...(optimisticOrg?.invitations || []),
                          ctx.data,
                        ],
                      });
                    }
                  },
                },
              });
              toast.promise(invite, {
                loading: "Inviting member...",
                success: "Member invited successfully",
                error: (error) => error.error.message,
              });
            }}
            className="w-full"
          >
            {loading ? (
              <Loader2 size={16} className="mr-2 animate-spin" />
            ) : (
              "Invite"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
