'use client';

import { useState } from 'react';
import { Box, Typography, Paper, Stack, Button, Fade } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import TableOfContents from '@/components/common/TableOfContents';

export default function MemoryConcept() {
	const [step, setStep] = useState(0);

	return (
		<ConceptWrapper
			title="How Computers Store Data"
			description="Explore how computers use memory and storage to keep and retrieve information."
		>
			<TableOfContents>
				<Section
					title="1. Units of Measurement for Data"
					subtitle="Similar to how we measure distance in inches, feet, yards, etc, computers measure data in bits, bytes, kilobytes, and more."
				>
					<Box sx={{ maxWidth: 700, mx: 'auto', my: 3 }}>
						<Box
							sx={{
								display: 'flex',
								flexDirection: { xs: 'column', sm: 'row' },
								alignItems: 'center',
								justifyContent: 'center',
								gap: 3,
								my: 3,
							}}
						>
							<Paper sx={{ p: 2, minWidth: 120, textAlign: 'center', bgcolor: '#e3f2fd', border: '2px solid #90caf9' }}>
								<Typography fontWeight={700} sx={{ mb: 1 }}>Bit</Typography>
								<Typography variant="h4" sx={{ fontFamily: 'monospace', mb: 1 }}>0</Typography>
								<Typography variant="h4" sx={{ fontFamily: 'monospace', mb: 1 }}>1</Typography>
								<Typography variant="caption" color="text.secondary">
									A single binary digit (on or off)
								</Typography>
							</Paper>
							<ArrowForwardIcon sx={{ color: '#bdbdbd', fontSize: 32, my: 1 }} />
							<Paper sx={{ p: 2, minWidth: 120, textAlign: 'center', bgcolor: '#fffde7', border: '2px solid #ffe082' }}>
								<Typography fontWeight={700} sx={{ mb: 1 }}>Byte</Typography>
								<Typography variant="h6" sx={{ fontFamily: 'monospace', mb: 1 }}>
									01010101
								</Typography>
								<Typography variant="caption" color="text.secondary">
									1 byte = 8 bits
								</Typography>
							</Paper>
							<ArrowForwardIcon sx={{ color: '#bdbdbd', fontSize: 32, my: 1 }} />
							<Paper sx={{ p: 2, minWidth: 120, textAlign: 'center', bgcolor: '#e8f5e9', border: '2px solid #81c784' }}>
								<Typography fontWeight={700} sx={{ mb: 1 }}>Kilobyte (KB)</Typography>
								<Typography variant="h6" sx={{ fontFamily: 'monospace', mb: 1 }}>
									1 KB = 1024 bytes
								</Typography>
								<Typography variant="caption" color="text.secondary">
									(About 1,000 characters)
								</Typography>
							</Paper>
							<ArrowForwardIcon sx={{ color: '#bdbdbd', fontSize: 32, my: 1 }} />
							<Paper sx={{ p: 2, minWidth: 120, textAlign: 'center', bgcolor: '#f3e5f5', border: '2px solid #ce93d8' }}>
								<Typography fontWeight={700} sx={{ mb: 1 }}>Megabyte (MB)</Typography>
								<Typography variant="h6" sx={{ fontFamily: 'monospace', mb: 1 }}>
									1 MB = 1024 KB
								</Typography>
								<Typography variant="caption" color="text.secondary">
									(About a million characters)
								</Typography>
							</Paper>
						</Box>
					</Box>
				</Section>
				<Section
					title="2. How Data is Stored"
				>
					<Box sx={{ maxWidth: 700, mx: 'auto', my: 3 }}>
						<Typography sx={{ mb: 2 }}>
							Computers store everything—text, pictures, numbers, programs, and more—as long strings of <b>bits</b> (just 0s and 1s). These bits are grouped into <b>bytes</b> (8 bits), and then into bigger chunks like kilobytes (KB), megabytes (MB), and gigabytes (GB).
						</Typography>
						<Typography sx={{ mb: 2 }}>
							<b>Whole numbers</b> (like 42 or 2024) are stored as binary. One byte (8 bits) can count from <b>0</b> to <b>255</b>. If you need to count higher, the computer just uses more bytes together (for example, 4 bytes can count up to about 4 billion!).
						</Typography>
						<Paper sx={{ p: 2, mb: 2, textAlign: 'center', bgcolor: '#f8fafc' }}>
							<Typography fontWeight={600} sx={{ mb: 1 }}>
								Try it! Enter a whole number to see how it’s stored in binary (1, 2, or 4 bytes):
							</Typography>
							<WholeNumberBinaryDemo />
							<Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
								(Choose the number of bytes to see how large numbers are split across multiple bytes)
							</Typography>
						</Paper>
						<Typography sx={{ mb: 2 }}>
							<b>Negative numbers</b> use a trick called <b>two's complement</b>. The first bit says if the number is positive or negative. With 8 bits, you can store numbers from <b>-128</b> up to <b>127</b>.
						</Typography>
						<Paper sx={{ p: 2, mb: 2, textAlign: 'center', bgcolor: '#f8fafc' }}>
							<Typography fontWeight={600} sx={{ mb: 1 }}>
								Try it! Enter a whole number from -128 up to 127 to see how it's stored in binary:
							</Typography>
							<NegativesTwosComplementDemo />
							<Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
								(Choose the number of bytes to see how large numbers are split across multiple bytes)
							</Typography>
						</Paper>
						<Typography sx={{ mb: 2 }}>
							<b>Decimal numbers</b> (like 3.14 or -0.001) are stored using a system called <b>floating point</b>. It’s kind of like scientific notation, but in binary. The computer splits the number into a sign, an exponent, and a fraction. This lets it store really big or really tiny numbers, but sometimes the number isn’t exact (like how 1/3 is 0.333...).
						</Typography>
						<Paper sx={{ p: 2, mb: 2, textAlign: 'center', bgcolor: '#f8fafc' }}>
							<Typography fontWeight={600} sx={{ mb: 1 }}>
								Try it! Enter a decimal number to see its 32-bit float binary:
							</Typography>
							<FloatToBinaryDemo />
							<Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
								(IEEE 754 single-precision: Sign | Exponent | Fraction)
							</Typography>
							<Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
								<b>Note:</b> Not all decimals can be stored exactly!
							</Typography>
						</Paper>
						<Typography sx={{ mb: 2 }}>
							<b>Letters and symbols</b> are stored as numbers too! The computer uses a code to match each letter or symbol to a number:
						</Typography>
						<ul style={{ marginTop: 0, marginBottom: 16, marginLeft: 24 }}>
							<li>
								<Typography component="span">
									<b>ASCII</b>: Uses 1 byte for each letter, number, or symbol (for example, <b>A</b> is 65, <b>a</b> is 97).
								</Typography>
							</li>
							<li>
								<Typography component="span">
									<b>Unicode</b>: Handles letters from every language and even emojis! Some characters use 2 or 4 bytes (for example, <b>😊</b> uses 4 bytes).
								</Typography>
							</li>
						</ul>
						<Paper sx={{ p: 2, mb: 2, textAlign: 'center', bgcolor: '#f8fafc' }}>
							<Typography fontWeight={600} sx={{ mb: 1 }}>
								Try it! Type a letter or emoji to see its binary code:
							</Typography>
							<CharacterToBinaryDemo />
						</Paper>
					</Box>
				</Section>
			</TableOfContents>
		</ConceptWrapper>
	);
}

// Place this component in the same file, outside your main export:
function InteractiveDataEncoding() {
	const [mode, setMode] = useState<'text' | 'image' | 'program' | 'number'>('text');
	const [input, setInput] = useState('A');
	const [numberInput, setNumberInput] = useState('13');

	// Simple binary conversions for demo
	const getBinary = () => {
		if (mode === 'text') {
			return input
				.split('')
				.map((char) =>
					char
						.charCodeAt(0)
						.toString(2)
						.padStart(8, '0')
				)
				.join(' ');
		}
		if (mode === 'image') {
			return '11101100 01010101 ...';
		}
		if (mode === 'program') {
			return input
				.split('')
				.map((char) =>
					char
						.charCodeAt(0)
						.toString(2)
						.padStart(8, '0')
				)
				.join(' ');
		}
		if (mode === 'number') {
			const n = parseInt(numberInput, 10);
			if (isNaN(n) || n < 0 || n > 255) return '';
			return n.toString(2).padStart(8, '0');
		}
		return '';
	};

	return (
		<Paper sx={{ p: 2, mb: 2, textAlign: 'center', bgcolor: '#f8fafc' }}>
			<Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
				<Button
					variant={mode === 'text' ? 'contained' : 'outlined'}
					onClick={() => setMode('text')}
					size="small"
				>
					Text
				</Button>
				<Button
					variant={mode === 'image' ? 'contained' : 'outlined'}
					onClick={() => setMode('image')}
					size="small"
				>
					Image
				</Button>
				<Button
					variant={mode === 'number' ? 'contained' : 'outlined'}
					onClick={() => setMode('number')}
					size="small"
				>
					Number
				</Button>
			</Box>
			{mode === 'text' && (
				<Box>
					<Typography fontWeight={600} sx={{ mb: 1 }}>
						Type a letter or word:
					</Typography>
					<input
						value={input}
						maxLength={12}
						onChange={e => setInput(e.target.value.replace(/[^a-zA-Z0-9 ]/g, ''))}
						style={{
							fontFamily: 'monospace',
							fontSize: 20,
							padding: '4px 8px',
							borderRadius: 4,
							border: '1px solid #bbb',
							marginBottom: 12,
							width: 120,
							textAlign: 'center'
						}}
					/>
				</Box>
			)}
			{mode === 'image' && (
				<Box sx={{ mb: 1 }}>
					<Typography fontWeight={600} sx={{ mb: 1 }}>
						Images are stored as binary for each pixel
					</Typography>
					<Box
						sx={{
							width: 40,
							height: 40,
							bgcolor: '#90caf9',
							borderRadius: 1,
							mx: 'auto',
							mb: 1,
							border: '2px solid #1976d2',
						}}
					/>
				</Box>
			)}
			{mode === 'number' && (
				<Box>
					<Typography fontWeight={600} sx={{ mb: 1 }}>
						Type a number (0-255):
					</Typography>
					<input
						type="number"
						min={0}
						max={255}
						value={numberInput}
						onChange={e => setNumberInput(e.target.value.replace(/[^0-9]/g, '').slice(0, 3))}
						style={{
							fontFamily: 'monospace',
							fontSize: 20,
							padding: '4px 8px',
							borderRadius: 4,
							border: '1px solid #bbb',
							marginBottom: 12,
							width: 100,
							textAlign: 'center'
						}}
					/>
				</Box>
			)}
			<ArrowForwardIcon sx={{ color: '#2196f3', fontSize: 32, my: 1 }} />
			<Typography fontWeight={600} sx={{ mb: 1 }}>
				Binary
			</Typography>
			<Typography
				variant="h6"
				sx={{
					fontFamily: 'monospace',
					wordBreak: 'break-all',
					bgcolor: '#f4f4f4',
					borderRadius: 1,
					px: 1,
					py: 0.5,
					display: 'inline-block',
				}}
			>
				{getBinary()}
			</Typography>
			<Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
				{mode === 'text' && '(Each character is stored as 8 bits)'}
				{mode === 'image' && '(Images are stored as long sequences of bits)'}
				{mode === 'number' && '(Numbers are stored as binary too!)'}
			</Typography>
		</Paper>
	);
}

// Place these helper components in the same file, outside your main export:
function NumberToBinaryDemoDetailed() {
	const [num, setNum] = useState(13);

	// Unsigned: 0..255, Signed (two's complement): -128..127
	const toUnsigned = (n: number) => n.toString(2).padStart(8, '0');
	const toSigned = (n: number) => {
		if (n >= 0) return n.toString(2).padStart(8, '0');
		// Two's complement for negative numbers
		return (256 + n).toString(2).padStart(8, '0');
	};

	return (
		<Box>
			<input
				type="number"
				min={-128}
				max={127}
				value={num}
				onChange={e => {
					let v = parseInt(e.target.value, 10);
					if (isNaN(v)) v = 0;
					if (v < -128) v = -128;
					if (v > 127) v = 127;
					setNum(v);
				}}
				style={{
					fontFamily: 'monospace',
					fontSize: 20,
					padding: '4px 8px',
					borderRadius: 4,
					border: '1px solid #bbb',
					marginBottom: 12,
					width: 80,
					textAlign: 'center'
				}}
			/>
			<Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, alignItems: 'center', mb: 1 }}>
				<Box>
					<Typography fontWeight={600}>Unsigned (0 to 255):</Typography>
					<Typography sx={{ fontFamily: 'monospace', fontSize: 18, bgcolor: '#f4f4f4', borderRadius: 1, px: 1, py: 0.5 }}>
						{toUnsigned(num & 0xff)}
					</Typography>
				</Box>
				<ArrowForwardIcon sx={{ color: '#2196f3', fontSize: 28 }} />
				<Box>
					<Typography fontWeight={600}>Signed (-128 to 127):</Typography>
					<Typography sx={{ fontFamily: 'monospace', fontSize: 18, bgcolor: '#f4f4f4', borderRadius: 1, px: 1, py: 0.5 }}>
						{toSigned(num)}
					</Typography>
				</Box>
			</Box>
			<Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
				(Signed uses two's complement for negatives)
			</Typography>
		</Box>
	);
}

function CharacterToBinaryDemo() {
	const [char, setChar] = useState('A');
	// Helper to get UTF-8 binary for any character
	function toUtf8Binary(str: string) {
		return Array.from(new TextEncoder().encode(str))
			.map(b => b.toString(2).padStart(8, '0'))
			.join(' ');
	}
	return (
		<Box>
			<input
				value={char}
				maxLength={2}
				onChange={e => setChar(e.target.value)}
				style={{
					fontFamily: 'monospace',
					fontSize: 20,
					padding: '4px 8px',
					borderRadius: 4,
					border: '1px solid #bbb',
					marginBottom: 12,
					width: 60,
					textAlign: 'center'
				}}
			/>
			<ArrowForwardIcon sx={{ color: '#2196f3', fontSize: 28, mx: 1, verticalAlign: 'middle' }} />
			<span
				style={{
					fontFamily: 'monospace',
					fontSize: 18,
					background: '#f4f4f4',
					borderRadius: 4,
					padding: '4px 12px',
					display: 'inline-block',
					minWidth: 90,
				}}
			>
				{char ? toUtf8Binary(char) : ''}
			</span>
			<Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
				(UTF-8 encoding: {char ? `${new TextEncoder().encode(char).length} byte${new TextEncoder().encode(char).length > 1 ? 's' : ''}` : ''})
			</Typography>
		</Box>
	);
}

// Place this helper component in the same file, outside your main export:
function FloatToBinaryDemo() {
	const [input, setInput] = useState('3.14');
	const num = parseFloat(input);

	// Converts a JS number to 32-bit float binary string
	function floatToBinary(f: number) {
		if (isNaN(f)) return '';
		const floatArray = new Float32Array(1);
		floatArray[0] = f;
		const intArray = new Uint32Array(floatArray.buffer);
		return intArray[0].toString(2).padStart(32, '0').replace(/(.{8})/g, '$1 ').trim();
	}

	return (
		<Box>
			<input
				type="text"
				value={input}
				onChange={e => setInput(e.target.value)}
				style={{
					fontFamily: 'monospace',
					fontSize: 20,
					padding: '4px 8px',
					borderRadius: 4,
					border: '1px solid #bbb',
					marginBottom: 12,
					width: 120,
					textAlign: 'center'
				}}
			/>
			<ArrowForwardIcon sx={{ color: '#2196f3', fontSize: 28, mx: 1, verticalAlign: 'middle' }} />
			<span
				style={{
					fontFamily: 'monospace',
					fontSize: 18,
					background: '#f4f4f4',
					borderRadius: 4,
					padding: '4px 12px',
					display: 'inline-block',
					minWidth: 180,
				}}
			>
				{floatToBinary(num)}
			</span>
		</Box>
	);
}

// Place this helper component in the same file, outside your main export:
function WholeNumberBinaryDemo() {
	const [value, setValue] = useState('42');
	const [bytes, setBytes] = useState(1);

	const maxValues = [255, 65535, 4294967295];
	const max = maxValues[bytes - 1];

	let num = parseInt(value, 10);
	if (isNaN(num) || num < 0) num = 0;
	if (num > max) num = max;

	// Convert to binary, padded to the correct byte length
	const bin = num.toString(2).padStart(bytes * 8, '0').replace(/(.{8})/g, '$1 ').trim();

	return (
		<Box>
			<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2 }}>
				<input
					type="number"
					min={0}
					max={max}
					value={value}
					onChange={e => setValue(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
					style={{
						fontFamily: 'monospace',
						fontSize: 20,
						padding: '4px 8px',
						borderRadius: 4,
						border: '1px solid #bbb',
						width: 120,
						textAlign: 'center'
					}}
				/>
				<Typography sx={{ mx: 1 }}>as</Typography>
				<Button
					variant={bytes === 1 ? 'contained' : 'outlined'}
					size="small"
					onClick={() => setBytes(1)}
				>
					1 byte
				</Button>
				<Button
					variant={bytes === 2 ? 'contained' : 'outlined'}
					size="small"
					onClick={() => setBytes(2)}
				>
					2 bytes
				</Button>
			</Box>
			<ArrowForwardIcon sx={{ color: '#2196f3', fontSize: 28, mx: 1, verticalAlign: 'middle' }} />
			<span
				style={{
					fontFamily: 'monospace',
					fontSize: 18,
					background: '#f4f4f4',
					borderRadius: 4,
					padding: '4px 12px',
					display: 'inline-block',
					minWidth: 180,
				}}
			>
				{bin}
			</span>
			<Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
				(Max value: {max.toLocaleString()} for {bytes} byte{bytes > 1 ? 's' : ''})
			</Typography>
		</Box>
	);
}

// Place this helper component in the same file, outside your main export:
function NegativesTwosComplementDemo() {
	const [num, setNum] = useState(0);

	// Two's complement for signed 8-bit
	const toTwosComplement = (n: number) => {
		if (n >= 0) return n.toString(2).padStart(8, '0');
		return (256 + n).toString(2).padStart(8, '0');
	};

	return (
		<Box>
			<input
				type="number"
				min={-128}
				max={127}
				value={num}
				onChange={e => {
					let v = parseInt(e.target.value, 10);
					if (isNaN(v)) v = 0;
					if (v < -128) v = -128;
					if (v > 127) v = 127;
					setNum(v);
				}}
				style={{
					fontFamily: 'monospace',
					fontSize: 20,
					padding: '4px 8px',
					borderRadius: 4,
					border: '1px solid #bbb',
					marginBottom: 12,
					width: 80,
					textAlign: 'center'
				}}
			/>
			<ArrowForwardIcon sx={{ color: '#2196f3', fontSize: 28, mx: 1, verticalAlign: 'middle' }} />
			<span
				style={{
					fontFamily: 'monospace',
					fontSize: 18,
					background: '#f4f4f4',
					borderRadius: 4,
					padding: '4px 12px',
					display: 'inline-block',
					minWidth: 110,
				}}
			>
				{toTwosComplement(num)}
			</span>
			<Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
				{num >= 0
					? `Positive: normal binary`
					: `Negative: two's complement (add 256 to the negative number)`}
			</Typography>
		</Box>
	);
}