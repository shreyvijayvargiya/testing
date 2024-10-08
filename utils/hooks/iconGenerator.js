import * as LucideIcons from "lucide-react";

export const iconMap = [
	LucideIcons.Activity,
	LucideIcons.Airplay,
	LucideIcons.AlertCircle,
	LucideIcons.AlertOctagon,
	LucideIcons.AlertTriangle,
	LucideIcons.AlignCenter,
	LucideIcons.AlignJustify,
	LucideIcons.AlignLeft,
	LucideIcons.AlignRight,
	LucideIcons.Anchor,
	LucideIcons.Aperture,
	LucideIcons.Archive,
	LucideIcons.ArrowDownCircle,
	LucideIcons.ArrowDownLeft,
	LucideIcons.ArrowDownRight,
	LucideIcons.ArrowDown,
	LucideIcons.ArrowLeftCircle,
	LucideIcons.ArrowLeft,
	LucideIcons.ArrowRightCircle,
	LucideIcons.ArrowRight,
	LucideIcons.ArrowUpCircle,
	LucideIcons.ArrowUpLeft,
	LucideIcons.ArrowUpRight,
	LucideIcons.ArrowUp,
	LucideIcons.AtSign,
	LucideIcons.Award,
	LucideIcons.BarChart2,
	LucideIcons.BarChart,
	LucideIcons.BatteryCharging,
	LucideIcons.Battery,
	LucideIcons.BellOff,
	LucideIcons.Bell,
	LucideIcons.Bluetooth,
	LucideIcons.Bold,
	LucideIcons.BookOpen,
	LucideIcons.Book,
	LucideIcons.Bookmark,
	LucideIcons.Box,
	LucideIcons.Briefcase,
	LucideIcons.Calendar,
	LucideIcons.CameraOff,
	LucideIcons.Camera,
	LucideIcons.Cast,
	LucideIcons.CheckCircle,
	LucideIcons.CheckSquare,
	LucideIcons.Check,
	LucideIcons.ChevronDown,
	LucideIcons.ChevronLeft,
	LucideIcons.ChevronRight,
	LucideIcons.ChevronUp,
	LucideIcons.Chrome,
	LucideIcons.Circle,
	LucideIcons.Clipboard,
	LucideIcons.Clock,
	LucideIcons.CloudDrizzle,
	LucideIcons.CloudLightning,
	LucideIcons.CloudOff,
	LucideIcons.CloudRain,
	LucideIcons.CloudSnow,
	LucideIcons.Cloud,
	LucideIcons.Code,
	LucideIcons.Codepen,
	LucideIcons.Codesandbox,
	LucideIcons.Coffee,
	LucideIcons.Columns,
	LucideIcons.Command,
	LucideIcons.Compass,
	LucideIcons.Copy,
	LucideIcons.CornerDownLeft,
	LucideIcons.CornerDownRight,
	LucideIcons.CornerLeftDown,
	LucideIcons.CornerLeftUp,
	LucideIcons.CornerRightDown,
	LucideIcons.CornerRightUp,
	LucideIcons.CornerUpLeft,
	LucideIcons.CornerUpRight,
	LucideIcons.Cpu,
	LucideIcons.CreditCard,
	LucideIcons.Crop,
	LucideIcons.Crosshair,
	LucideIcons.Database,
	LucideIcons.Delete,
	LucideIcons.Disc,
	LucideIcons.DivideCircle,
	LucideIcons.DivideSquare,
	LucideIcons.Divide,
	LucideIcons.DollarSign,
	LucideIcons.DownloadCloud,
	LucideIcons.Download,
	LucideIcons.Drip,
	LucideIcons.Droplet,
	LucideIcons.Edit2,
	LucideIcons.Edit3,
	LucideIcons.Edit,
	LucideIcons.ExternalLink,
	LucideIcons.EyeOff,
	LucideIcons.Eye,
	LucideIcons.Facebook,
	LucideIcons.FastForward,
	LucideIcons.Feather,
	LucideIcons.Figma,
	LucideIcons.FileMinus,
	LucideIcons.FilePlus,
	LucideIcons.FileText,
	LucideIcons.File,
];

const iconGenerator = () => {
	let number = Math.round(Math.random() * 50) + 1;
	if (number < 1 || number > 100) {
		throw new Error("Number must be between 1 and 100");
	}
	return iconMap[number - 1];
};

export default iconGenerator;
