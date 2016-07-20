<script>
	import { createSubComponent } from 'services/public';
	import VtableOpts from 'components/Vtable';
	import VtbodySpecial from './Vtbody';

	export default createSubComponent(VtableOpts, {
		name: 'TableSpecial',
		components: {
			Vtbody: VtbodySpecial
		}
	});
	
</script>