'use client';

import { useState } from 'react';
import { Box, Typography, Paper, Button, } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import TableOfContents from '@/components/common/TableOfContents';

export default function MemoryConcept() {
	return (
		<ConceptWrapper
			title="How Computers Store Data"
			description="When you write programs or work with data, everything needs to be stored in a way that the computer can understand. Here, we'll explain how computers work with data."
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
							Computers store everything (text, pictures, numbers, programs, and more) as long strings of <b>bits</b> (just 0s and 1s). These bits are grouped into <b>bytes</b> (8 bits), and then into bigger chunks like kilobytes (KB), megabytes (MB), and gigabytes (GB).
						</Typography>
						<Typography sx={{ mb: 2 }}>
							<b>Whole numbers</b> (like 42 or 2024) are stored as groups of bits. One byte (8 bits) can count from <b>0</b> to <b>255</b>. If you need to count higher, the computer just uses more bytes together (for example, 4 bytes - 32 bits - can count up to about 4 billion!).
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
							<b>Negative numbers</b> use a trick called <b>two&apos;s complement</b>. The first bit, the leftmost bit, says if the number is positive or negative.
							<ul style={{ marginTop: 4, marginBottom: 4, marginLeft: 24 }}>
								<li>
									If the sign bit is <b>0</b>, the number is positive (or zero).
								</li>
								<li>
									If the sign bit is <b>1</b>, the number is negative.
								</li>
							</ul>
							With 8 bits, you can store numbers from <b>-128</b> up to <b>127</b>.
						</Typography>
						<Paper sx={{ p: 2, mb: 2, textAlign: 'center', bgcolor: '#f8fafc' }}>
							<Typography fontWeight={600} sx={{ mb: 1 }}>
								Try it! Enter a negative or positive number to see its 8-bit two&apos;s complement binary:
							</Typography>
							<NegativesTwosComplementDemo />
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
				<Section
					title="3. How Bits Represent Hardware"
				>
					<Box sx={{ maxWidth: 700, mx: 'auto', my: 3 }}>
						<Typography sx={{ mb: 2 }}>
							Inside the computer, millions (sometimes billions) of tiny electronic switches called <b>transistors</b> can be either <b>on</b> or <b>off</b>, exactly like how bits can be either <b>1</b> or <b>0</b>. These transistors are the physical representation of bits.
						</Typography>
						<Typography sx={{ mb: 2 }}>
							We flip these transistors on and off to represent different values.
						</Typography>
						<Typography sx={{ mb: 2 }}>
							For example, if we want to store the number 5 (whose binary representation is <b>00000101</b>), we would turn on the transistors corresponding to the bits that are <b>1</b>.
						</Typography>
						<Typography sx={{ mb: 2 }}>
							Another example: if we want to store the letter <b>A</b> (which is represented by <b>01000001</b> in binary), we would turn on the first and sixth transistors, leaving the others off.
						</Typography>
						<Paper sx={{ p: 2, bgcolor: '#f8fafc', border: '1px solid #e0e0e0', mt: 2, mb: 2 }}>
							<Typography fontWeight={600} sx={{ mb: 1 }}>
								Visualize how a group of transistors and their corresponding bits can store numbers:
							</Typography>
							<BitPatternVisualizer />
						</Paper>
					</Box>
				</Section>
				<Section
					title="4. Converting Between Decimal and Binary"
				>
					<Box sx={{ maxWidth: 700, mx: 'auto', my: 3 }}>
						<Typography sx={{ mb: 2 }}>
							You've probably guessed that there must be some way to convert between binary and regular numbers.
						</Typography>
						<Typography sx={{ mb: 2 }}>
							You'd be correct! To keep things simple, we do this by adding up the values of the bits.
						</Typography>
						<Typography sx={{ mb: 2 }}>
							Each bit represents a power of 2 (i.e 2^3, 2^2, 2^1, 2^0, where the exponent is equal to the spot that the bit occupies), starting from the rightmost bit (which is 2^0 = 1).
						</Typography>
						<Typography sx={{ mb: 2 }}>
							For example, to convert the binary number <b>0011</b> to decimal, we add: {" "}
							<span style={{ fontFamily: 'monospace' }}>
								0×8 + 0×4 + 1×2 + 1×1 = 0 + 0 + 2 + 1 = <b>3</b>
							</span>.
						</Typography>
						<Typography sx={{ mb: 2 }}>
							Another example: to convert the binary number <b>1101</b> to decimal, we add: {" "}
							<span style={{ fontFamily: 'monospace' }}>
								1×8 + 1×4 + 0×2 + 1×1 = 8 + 4 + 0 + 1 = <b>13</b>
							</span>.
						</Typography>
						<Paper sx={{ p: 2, mb: 2, textAlign: 'center', bgcolor: '#f8fafc' }}>
							<Typography fontWeight={600} sx={{ mb: 1 }}>
								Try it! Convert between decimal and binary:
							</Typography>
							<DecimalBinaryConverter />
						</Paper>
					</Box>
				</Section>
			</TableOfContents>
		</ConceptWrapper>
	);
}

// Place these helper components in the same file, outside your main export:
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
					? `Positive: note the 0 in the leftmost bit`
					: `Negative: note the 1 in the leftmost bit`}
			</Typography>
		</Box>
	);
}

function DecimalBinaryConverter() {
	const [mode, setMode] = useState<'dec2bin' | 'bin2dec'>('dec2bin');
	const [decimal, setDecimal] = useState('13');
	const [binary, setBinary] = useState('1101');

	const dec = parseInt(decimal, 10);
	const bin = parseInt(binary, 2);

	function getBinaryBreakdown(n: number) {
		if (isNaN(n) || n < 0 || n > 255) return [];
		const bits = n.toString(2).padStart(8, '0').split('');
		return bits.map((bit, i) => ({
			bit,
			value: Math.pow(2, 7 - i),
			used: bit === '1'
		}));
	}

	function getDecimalBreakdown(b: string) {
		const bits = b.padStart(8, '0').split('');
		return bits.map((bit, i) => ({
			bit,
			value: Math.pow(2, 7 - i),
			used: bit === '1'
		}));
	}

	// Dynamic explanation and example
	let explanation;
	if (mode === 'dec2bin') {
		explanation = (
			<>
				<Typography sx={{ mb: 2 }}>
					<span style={{ fontFamily: 'monospace' }}>
						{getBinaryBreakdown(dec).map((b, i) =>
							b.used
								? <span key={i}>{b.bit}×{b.value}{i < 7 ? ' + ' : ''}</span>
								: <span key={i} style={{ color: '#bbb' }}>{b.bit}×{b.value}{i < 7 ? ' + ' : ''}</span>
						)}
						{' = '}
						{getBinaryBreakdown(dec).filter(b => b.used).map(b => b.value).join(' + ') || 0}
						{' = '}
						{isNaN(dec) ? 0 : dec}
					</span>
				</Typography>
			</>
		);
	} else {
		explanation = (
			<>
				<Typography sx={{ mb: 2 }}>
					<span style={{ fontFamily: 'monospace' }}>
						{getDecimalBreakdown(binary).map((b, i) =>
							b.used
								? <span key={i}>{b.bit}×{b.value}{i < 7 ? ' + ' : ''}</span>
								: <span key={i} style={{ color: '#bbb' }}>{b.bit}×{b.value}{i < 7 ? ' + ' : ''}</span>
						)}
						{' = '}
						{getDecimalBreakdown(binary).filter(b => b.used).map(b => b.value).join(' + ') || 0}
						{' = '}
						{isNaN(bin) ? 0 : bin}
					</span>
				</Typography>
			</>
		);
	}

	return (
		<Box>
			<Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
				<Button
					variant={mode === 'dec2bin' ? 'contained' : 'outlined'}
					onClick={() => setMode('dec2bin')}
					size="small"
				>
					Decimal → Binary
				</Button>
				<Button
					variant={mode === 'bin2dec' ? 'contained' : 'outlined'}
					onClick={() => setMode('bin2dec')}
					size="small"
				>
					Binary → Decimal
				</Button>
			</Box>
			{mode === 'dec2bin' ? (
				<Box>
					<Typography fontWeight={600} sx={{ mb: 1 }}>
						Decimal:
					</Typography>
					<input
						type="number"
						min={0}
						max={255}
						value={decimal}
						onChange={e => {
							const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 3);
							setDecimal(val);
							setBinary(parseInt(val || '0', 10).toString(2));
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
					<Typography fontWeight={600} sx={{ mb: 1 }}>
						Binary:
					</Typography>
					<span
						style={{
							fontFamily: 'monospace',
							fontSize: 20,
							background: '#f4f4f4',
							borderRadius: 4,
							padding: '4px 12px',
							display: 'inline-block',
							minWidth: 110,
						}}
					>
						{isNaN(dec) ? '' : dec.toString(2)}
					</span>
					<Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 1 }}>
						{getBinaryBreakdown(dec).map((b, i) => (
							<Box key={i} sx={{ textAlign: 'center' }}>
								<Typography
									sx={{
										fontFamily: 'monospace',
										fontSize: 18,
										color: b.used ? '#1976d2' : '#aaa',
										fontWeight: b.used ? 700 : 400,
									}}
								>
									{b.bit}
								</Typography>
								<Typography variant="caption" color="text.secondary">
									{b.value}
								</Typography>
							</Box>
						))}
					</Box>
				</Box>
			) : (
				<Box>
					<Typography fontWeight={600} sx={{ mb: 1 }}>
						Binary:
					</Typography>
					<input
						type="text"
						maxLength={8}
						value={binary}
						onChange={e => {
							const val = e.target.value.replace(/[^01]/g, '').slice(0, 8);
							setBinary(val);
							setDecimal(parseInt(val || '0', 2).toString(10));
						}}
						style={{
							fontFamily: 'monospace',
							fontSize: 20,
							padding: '4px 8px',
							borderRadius: 4,
							border: '1px solid #bbb',
							marginBottom: 12,
							width: 110,
							textAlign: 'center'
						}}
					/>
					<ArrowForwardIcon sx={{ color: '#2196f3', fontSize: 28, mx: 1, verticalAlign: 'middle' }} />
					<Typography fontWeight={600} sx={{ mb: 1 }}>
						Decimal:
					</Typography>
					<span
						style={{
							fontFamily: 'monospace',
							fontSize: 20,
							background: '#f4f4f4',
							borderRadius: 4,
							padding: '4px 12px',
							display: 'inline-block',
							minWidth: 80,
						}}
					>
						{isNaN(bin) ? '' : bin}
					</span>
					<Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 1 }}>
						{getDecimalBreakdown(binary).map((b, i) => (
							<Box key={i} sx={{ textAlign: 'center' }}>
								<Typography
									sx={{
										fontFamily: 'monospace',
										fontSize: 18,
										color: b.used ? '#1976d2' : '#aaa',
										fontWeight: b.used ? 700 : 400,
									}}
								>
									{b.bit}
								</Typography>
								<Typography variant="caption" color="text.secondary">
									{b.value}
								</Typography>
							</Box>
						))}
					</Box>
				</Box>
			)}
			{/* Dynamic explanation and example */}
			<Box sx={{ mt: 3 }}>{explanation}</Box>
		</Box>
	);
}

// Place this helper component in the same file, outside your main export:
function BitPatternVisualizer() {
	const [bits, setBits] = useState('01000001');

	// Interpret as unsigned integer
	const asNumber = parseInt(bits, 2);
	
	// Visual: clickable bits
	const handleBitToggle = (idx: number) => {
		setBits(prev =>
			prev
				.split('')
				.map((b, i) => (i === idx ? (b === '1' ? '0' : '1') : b))
				.join('')
		);
	};

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			<Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
				{bits.split('').map((bit, i) => (
					<Button
						key={i}
						variant="contained"
						size="small"
						sx={{
							minWidth: 36,
							minHeight: 36,
							fontFamily: 'monospace',
							fontSize: 20,
							bgcolor: bit === '1' ? '#1976d2' : '#e0e0e0',
							color: bit === '1' ? '#fff' : '#333',
							border: '1px solid #90caf9',
							boxShadow: bit === '1' ? 2 : 0,
							transition: 'all 0.2s',
							p: 0,
						}}
						onClick={() => handleBitToggle(i)}
						aria-label={`Toggle bit ${i}`}
					>
						{bit}
					</Button>
				))}
			</Box>
			<Box sx={{ display: 'flex', gap: 3, alignItems: 'center', mb: 1 }}>
				<Box sx={{ textAlign: 'center' }}>
					<Typography variant="caption" color="text.secondary">
						As a number
					</Typography>
					<Typography sx={{ fontFamily: 'monospace', fontSize: 20 }}>
						{asNumber}
					</Typography>
				</Box>
			</Box>
			<Typography variant="caption" color="text.secondary">
				Click a transistor to flip it (and its bit value) and see how the meaning changes!
			</Typography>
		</Box>
	);
}