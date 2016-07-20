<script>
	import { createSubComponent } from 'services/public';
	import TabOpts from 'components/Tab';
	import TabNavSpecialTypes from './TabNav';

	export default createSubComponent(TabOpts, {
		name: 'TabNavSpecialTypes',
		components: {
			TabNav: TabNavSpecialTypes
		}
	});

</script>