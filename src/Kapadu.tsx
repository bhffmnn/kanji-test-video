import {
	interpolate,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {Img} from 'remotion';

export const Kapadu = () => {
	const {fps, durationInFrames, width, height} = useVideoConfig();
	const frame = useCurrentFrame();
	const topBlue = interpolate(frame, [0, durationInFrames / 4], [-height, 0], {
		extrapolateRight: 'clamp',
	});
	const opacity = interpolate(
		frame - durationInFrames / 4,
		[0, durationInFrames / 2],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
	);
	const blur = interpolate(
		frame - durationInFrames / 4,
		[0, durationInFrames / 2],
		[10, 0],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
	);
	const blurCall = 'blur(' + blur + 'px)';
	const bottom = ((Math.sin(frame / 2) + 1) * height) / 100 + (1 / 8) * height;
	return (
		<div
			style={{
				background: 'white',
				height,
				width,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				position: 'relative',
			}}
		>
			<div
				style={{
					fontSize: height - 277 + 'px',
					lineHeight: height - 275 + 'px',
					position: 'absolute',
					top: '150px',
				}}
			>
				龜
			</div>
			<div
				style={{
					width,
					height,
					background: 'black',
					// Overflow: 'hidden',
					position: 'fixed',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					top: topBlue,
					clip: 'rect(0, auto, auto, 0)',
				}}
			>
				<div
					style={{
						height: height - 200 + 'px',
						top: 100,
						position: 'fixed',
					}}
				>
					<Img
						src={staticFile('龜-bigseal_white.svg')}
						style={{
							height: height - 200 + 'px',
						}}
					/>
					<div
						style={{
							color: 'white',
							opacity,
							fontSize: '30px',
							filter: blurCall,
						}}
					>
						Big Seal Script
					</div>
				</div>
			</div>
		</div>
	);
};
